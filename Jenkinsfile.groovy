String podSpec = '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:18.16.1-alpine
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
        organization = 'overture-stack'
        appName = 'lectern'
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

    stages {
        stage('Prepare') {
            steps {
                container('node') {
                    sh 'npx --yes pnpm install'
                }
            }
        }

        stage('Build') {
            steps {
                container('docker') {
                    // the network=host needed to download dependencies using the host network (since we are inside 'docker' container)
                    sh "docker build --build-arg=COMMIT=${commit} --network=host -f Dockerfile . -t consent-ui:${commit}"
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
