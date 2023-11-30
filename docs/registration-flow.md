# Participant Registration Flow

### Registration Flow Part A
#### Creating the User in Keycloak + OHCRN

```mermaid
sequenceDiagram
    participant client as consent-ui-client
    participant server as consent-ui-server
    participant keycloak-ui
    participant keycloak as keycloak-admin-api
    participant consent-api
    participant data-mapper
    participant pi-das
    participant consent-das

    Note over client: User fills in registration form + submits
    client->>+server: POST to /api/registration
    server->>+keycloak: retrieve client app token from /token endpoint using client id + secret
    keycloak->>server: respond with client token
    server->>keycloak: POST to admin/realms/<realm-name>/users endpoint with required fields + client token
    Note over keycloak: { firstName, lastName, email, password, requiredActions: ["VERIFY_EMAIL"] }
    Note over keycloak: custom attributes: { isGuardian, if isGuardian incl. participantFirstName }
    keycloak->>server: empty success response
    server->>keycloak: GET request to fetch user by email
    keycloak->>-server: success response with user data
    server->>+consent-api: POST to /registration with participant form info + recaptcha + keycloak user info
    Note over consent-api: /registration authorization provided via recaptcha token
    consent-api->>+data-mapper: POST /createParticipant
    Note over data-mapper: validate participant info
    data-mapper->>+pi-das: POST /participant
    Note over pi-das: new Participant created
    pi-das->>-data-mapper: success response with participantId
    data-mapper->>+consent-das: POST /participant with PI participantId
    Note over consent-das: new Participant created with participantId
    consent-das->>-data-mapper: success response
    data-mapper->>-consent-api: success response with participant data
    consent-api->>consent-api: send welcome email to participant or guardian
    consent-api->>-server: successfully created participant
    server->>-client: redirect to registration page w/login prompt
```

When the user is redirected back to the login prompt screen, they can choose either to continue to login and complete the entire flow (Part B), or pause and finish later.

### Registration Flow Part B
#### User Login and Email Verification

```mermaid
sequenceDiagram
    participant client as consent-ui-client
    participant server as consent-ui-server
    participant keycloak-ui
    participant keycloak as keycloak-admin-api
    participant consent-api

    Note over client: access login via modal or header button
    client->>+server: User clicks "login"
    server->>server: next-auth login session initiated with necessary cookies
    server->>+keycloak-ui: login to keycloak, at /auth
    Note over keycloak-ui: user enters email + password
    keycloak-ui->>keycloak-ui: displays screen for email verification needed, no session created yet
    keycloak-ui->>keycloak-ui: keycloak sends verify email notification
    Note over keycloak-ui: user confirms email, updates keycloak user { email_verified: true }
    keycloak-ui->>keycloak-ui: keycloak user session created
    keycloak-ui->>-server: return auth token/code from keycloak
    server->>+keycloak-ui: sends auth code identifying login success
    keycloak-ui->>-server: responds with tokens: id, access and refresh
    server->>server: store account info in session (callback in next-auth).
    Note over server: TBD what we store in session, at minimum keycloak_id
    Note over server: requests to consent-api will now be user authenticated
    server->>+consent-api: GET /user with session info (keycloak_id)
    Note over consent-api: /user endpoint will combine info for participant + keycloak user
    Note over consent-api: GET request to data-mapper -> dases to retrieve participant info
    consent-api->>-server: successfully retrieve user + participant info
    server->>-client: redirect to /dashboard
```