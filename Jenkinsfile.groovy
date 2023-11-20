String podSpec = '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:18
    tty: true
    env:
    - name: DOCKER_HOST
      value: tcp://localhost:2375
    - name: HOME
      value: /home/jenkins/agent
  - name: dind-daemon
    image: docker:18-dind
    securityContext:
        privileged: true
        runAsUser: 0
    volumeMounts:
      - name: docker-graph-storage
        mountPath: /var/lib/docker
  - name: docker
    image: docker:20-git
    tty: true
    env:
    - name: DOCKER_HOST
      value: tcp://localhost:2375
    - name: HOME
      value: /home/jenkins/agent
  securityContext:
    runAsUser: 1000
  volumes:
  - name: docker-graph-storage
    emptyDir: {}
'''

pipeline {
    agent {
        kubernetes {
            yaml podSpec
        }
    }

    environment {
        containerRegistry = 'ghcr.io'
        organization = 'ohcrn'
        appName = 'consent-ui'
        gitHubRepo = "${organization}/${appName}"
        containerImageName = "${containerRegistry}/${gitHubRepo}"

        commit = sh(
            returnStdout: true,
            script: 'git describe --always'
        ).trim()

        version = sh(
            returnStdout: true,
            script:
                'cat package.json | ' +
                'grep "version" -m 1 | ' +
                'cut -d : -f2 | ' +
                "sed \'s:[\",]::g\'"
        ).trim()

        slackNotificationsUrl = credentials('OHCRNDevAlertsSlackJenkinsWebhookURL')
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    parameters {
        choice(
            name: 'POST_BUILD',
            choices: ['Nothing', 'Publish only', 'Publish and Deploy'],
            description: 'What to do after building the images'
        )
    }

    stages {
        stage('Prepare') {
            steps {
                container('node') {
                    sh 'npx --yes pnpm install'
                    sh 'npx --yes pnpm build'
                }
            }
        }

        stage('Test') {
            steps {
                container('node') {
                    sh 'npx --yes pnpm run test'
                }
            }
        }


        stage('Build') {
            steps {
                container('docker') {
                    // the network=host is needed to download dependencies using the host network (since we are inside 'docker' container)
                    sh "docker build --build-arg=COMMIT=${commit} --network=host -f Dockerfile . -t consent-ui:${commit}"
                }
            }
        }

        stage('Publish Images') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'main'
                    expression { return params.POST_BUILD ==~ /.*Publish.*/ }
                }
            }
            steps {
                container('docker') {
                    withCredentials([
                        usernamePassword(
                            credentialsId:'OvertureBioGithub',
                            passwordVariable: 'TOKEN',
                            usernameVariable: 'USERNAME',
                        )
                    ]) {
                        sh "echo $TOKEN | docker login ${containerRegistry} -u $USERNAME --password-stdin"

                        script {
                            if (env.BRANCH_NAME ==~ /(main)/) { // push latest and version tags
                                sh "docker tag consent-ui:${commit} ${containerImageName}:${version}"
                                sh "docker push ${containerImageName}:${version}"

                                sh "docker tag consent-ui:${commit} ${containerImageName}:latest"
                                sh "docker push ${containerImageName}:latest"
                            } else { // push commit tags
                                sh "docker tag consent-ui:${commit} ${containerImageName}:${commit}"
                                sh "docker push ${containerImageName}:${commit}"
                            }

                            if (env.BRANCH_NAME ==~ /(develop)/) { // push edge tag
                                sh "docker tag consent-ui:${commit} ${containerImageName}:edge"
                                sh "docker push ${containerImageName}:edge"
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy to ohcrn-dev') {
            when {
                anyOf {
                    branch 'develop'
                    expression { return params.POST_BUILD ==~ /.*Deploy.*/ }
                }
            }
            steps {
                script {
                    // we don't want the build to be tagged as failed because it could not be deployed.
                    try {
                        build(job: 'ohcrn/update-app-version', parameters: [
                            string(name: 'BUILD_BRANCH', value: env.BRANCH_NAME),
                            string(name: 'OHCRN_ENV', value: 'dev'),
                            string(name: 'NEW_APP_VERSION', value: "${commit}"),
                            string(name: 'TARGET_RELEASE', value: 'consent-ui'),
                        ])
                    } catch (err) {
                        echo 'The app built successfully, but could not be deployed'
                    }
                }
            }
        }
    }

    post {
        failure {
            container('node') {
                script {
                    if (env.BRANCH_NAME ==~ /(develop|main|\S*[Tt]est\S*)/) {
                        sh "curl \
                            -X POST \
                            -H 'Content-type: application/json' \
                            --data '{ \
                                \"text\":\"Build Failed: ${env.JOB_NAME}#${commit} \
                                \n[Build ${env.BUILD_NUMBER}] (${env.BUILD_URL})\" \
                            }' \
                            ${slackNotificationsUrl}"
                    }
                }
            }
        }

        fixed {
            container('node') {
                script {
                    if (env.BRANCH_NAME ==~ /(develop|main|\S*[Tt]est\S*)/) {
                        sh "curl \
                            -X POST \
                            -H 'Content-type: application/json' \
                            --data '{ \
                                \"text\":\"Build Fixed: ${env.JOB_NAME}#${commit} \
                                \n[Build ${env.BUILD_NUMBER}] (${env.BUILD_URL})\" \
                            }' \
                            ${slackNotificationsUrl}"
                    }
                }
            }
        }

        success {
            container('node') {
                script {
                    if (env.BRANCH_NAME ==~ /(\S*[Tt]est\S*)/) {
                        sh "curl \
                            -X POST \
                            -H 'Content-type: application/json' \
                            --data '{ \
                                \"text\":\"Build tested: ${env.JOB_NAME}#${commit} \
                                \n[Build ${env.BUILD_NUMBER}] (${env.BUILD_URL})\" \
                            }' \
                            ${slackNotificationsUrl}"
                    }
                }
            }
        }
    }
}
