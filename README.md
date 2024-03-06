# OHCRN Platform

[![TypeScript](https://img.shields.io/badge/types-%20TypeScript-blue)](https://www.typescriptlang.org/)

This repo contains the codebase for the OHCRN Platform:

- Consent Platform: portal through which participants can self-register and clinicians can register their patients to consent to participate in the OHCRN study
- Coordinator Dashboard: administrative dashboard for managing Participant consent and inputting data from clinics
- Data Portal: interface for interacting with the OHCRN data

This project is a monorepo managed by [pnpm](https://pnpm.io/motivation)

The directory structure is as follows:

```
.
├── .vscode/                        ← Shared VSCode Settings
├── apps/
│   ├── consent-api/                ← Consent Platform Node.js Express API
│   │   └── src
│   ├── consent-das/                ← Consent Data Access Service
│   │   ├── prisma
│   │   └── src
│   ├── consent-ui/                 ← Consent Platform Next.js UI
│   │   └── src
│   ├── data-mapper/                ← Data Mapper Node.js Express API
│   │   └── src
│   ├── keys-das/                   ← Keys Data Access Service
│   │   ├── prisma
│   │   └── src
│   ├── phi-das/                    ← PHI Data Access Service
│   │   ├── prisma
│   │   └── src
│   └── pi-das/                     ← PI Data Access Service
│       ├── prisma
│       └── src
├── docker-scripts/                 ← Docker Init Scripts
├── docs/                           ← Context-Specific Documentation
└── packages/
    ├── config/
    │   └── eslint-config-ohcrn     ← Shared ESLint Config
    ├── express-error-handler/      ← Reusable Error Handler for Express APIs
    │   └── src
    ├── express-logger/             ← Logger for Express API Requests
    │   └── src
    ├── express-request-validation/ ← Validation Wrapper for Express API Requests
    │   └── src
    ├── logger/                     ← Shared Logger
    │   └── src
    └── types/                      ← Shared Validation & Types
        └── src
```

### Writing Commits

To keep commit messages consistent, we use [gitmoji](https://gitmoji.dev). To easily access emojis on Mac, press ctrl+cmd+space.

## Local Development

To run the setup locally, ensure you have provided the **required** environment variables, as described in [Environment Variables](#environment-variables). Each package has an `.env.schema` file for reference, which you can create a copy of and rename to `.env` unless otherwise specified.

- In the [`./` project root folder](./), create an `.env` file copy of the root [`.env.schema`](./.env.schema) file
- In the [`/apps/consent-api/` folder](./apps/consent-api/), create an `.env` file
- In the [`/apps/consent-das/` folder](./apps/consent-das/), create an `.env` file
- In the [`/apps/consent-ui/` folder](./apps/consent-ui/), create an `.env.local` file
- In the [`/apps/data-mapper/` folder](./apps/data-mapper/), create an `.env` file
- In the [`/apps/keys-das/` folder](./apps/keys-das/), create an `.env` file
- In the [`/apps/phi-das/` folder](./apps/phi-das/), create an `.env` file
- In the [`/apps/pi-das/` folder](./apps/pi-das/), create an `.env` file

## Environment Variables

| Package       | Name                    | Description                                                                                                                                                                                                                                             | Type      | Required | Default                                                                                                                                                        |
| ------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.`           | `POSTGRES_USER`         | Docker Postgres database user                                                                                                                                                                                                                           | `string`  | Required | `postgres`                                                                                                                                                     |
| `.`           | `POSTGRES_USER`         | Docker Postgres database password                                                                                                                                                                                                                       | `string`  | Required | `postgres`                                                                                                                                                     |
| `consent-api` | `PORT`                  | Port number for the Consent API                                                                                                                                                                                                                         | `number`  | Optional | `8080`                                                                                                                                                         |
| `consent-api` | `NODE_ENV`              | Node environment name                                                                                                                                                                                                                                   | `string`  | Required | `development`                                                                                                                                                  |
| `consent-api` | `RECAPTCHA_SECRET_KEY`  | API secret key for ReCAPTCHA                                                                                                                                                                                                                            | `string`  | Required | Use [Google's SECRET test key](https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha.-what-should-i-do) for local dev |
| `consent-api` | `DATA_MAPPER_URL`       | URL for the Data Mapper                                                                                                                                                                                                                                 | `string`  | Required | `http://localhost:8081`                                                                                                                                        |
| `consent-das` | `DATABASE_URL`          | URL for the Consent DB                                                                                                                                                                                                                                  | `string`  | Required | `postgres://postgres:postgres@localhost:5432/consent_db`                                                                                                       |
| `consent-das` | `PORT`                  | Port number for the Consent DAS                                                                                                                                                                                                                         | `number`  | Optional | `8085`                                                                                                                                                         |
| `consent-ui`  | `AUTH_DISABLED`         | Disables auth for local UI development.                                                                                                                                                                                                                 | `boolean` | Optional |                                                                                                                                                                |
| `consent-ui`  | `AUTH_KEYCLOAK_ISSUER`  | Keycloak instance URL. This should be the fully qualified URL including your realm name: `https://my-keycloak-domain.com/realms/my_realm`.                                                                                                              | `string`  | Required |                                                                                                                                                                |
| `consent-ui`  | `AUTH_KEYCLOAK_ID`      | The ID of the client application configured in your Keycloak instance for user authentication.                                                                                                                                                          | `string`  | Required |                                                                                                                                                                |
| `consent-ui`  | `AUTH_KEYCLOAK_SECRET`  | The client secret of the client application configured in your Keycloak instance, found under the "Credentials" tab for the client app with the configured `AUTH_KEYCLOAK_ID`. This variable is inferred by Next-Auth and not exposed in the AppConfig. | `string`  | Required |                                                                                                                                                                |
| `consent-ui`  | `AUTH_SECRET`           | Secret key required by next-auth for encrypting sensitive data. This variable is inferred by Next-Auth and not exposed in the AppConfig.                                                                                                                | `string`  | Required |                                                                                                                                                                |
| `consent-ui`  | `AUTH_URL`              | URL for the auth api route in NextJS. This variable is inferred by Next-Auth and not exposed in the AppConfig.                                                                                                                                          | `string`  | Required | `http://localhost:3000/api/auth`                                                                                                                               |
| `consent-ui`  | `CONSENT_API_URL`       | URL for the Consent API                                                                                                                                                                                                                                 | `string`  | Optional | `http://localhost:8080`                                                                                                                                        |
| `consent-ui`  | `CONSENT_UI_URL`        | URL for the Consent UI                                                                                                                                                                                                                                  | `string`  | Optional | `http://localhost:3000`                                                                                                                                        |
| `consent-ui`  | `OHCRN_EMAIL`           | Main email address for OHCRN                                                                                                                                                                                                                            | `string`  | Optional |                                                                                                                                                                |
| `consent-ui`  | `OHCRN_HOME_LINK`       | Main URL for OHCRN                                                                                                                                                                                                                                      | `string`  | Optional |                                                                                                                                                                |
| `consent-ui`  | `RECAPTCHA_SITE_KEY`    | API site key for ReCAPTCHA                                                                                                                                                                                                                              | `string`  | Required | Use [Google's SITE test key](https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha.-what-should-i-do) for local dev   |
| `consent-ui`  | `TOKEN_ENCRYPTION_KEY`  | Secret key used by `cryptr` to encrypt/decrypt custom token data. `cryptr` will error and the app will fail to run if this value is not populated.                                                                                                      | `string`  | Required |                                                                                                                                                                |
| `consent-ui`  | `TOKEN_MAX_AGE`         | Next-Auth session lifespan, in seconds.                                                                                                                                                                                                                 | `number`  | Optional | `3600`                                                                                                                                                         |
| `consent-ui`  | `VERBOSE_AXIOS_LOGGING` | Enables verbose logging of Axios requests in the consent-ui application.                                                                                                                                                                                | `boolean` | Optional | `false`                                                                                                                                                        |
| `data-mapper` | `PORT`                  | Port number for the Data Mapper                                                                                                                                                                                                                         | `number`  | Optional | `8081`                                                                                                                                                         |
| `data-mapper` | `PI_DAS_URL`            | URL for the PI DAS                                                                                                                                                                                                                                      | `string`  | Optional | `http://localhost:8082`                                                                                                                                        |
| `data-mapper` | `PHI_DAS_URL`           | URL for the PHI DAS                                                                                                                                                                                                                                     | `string`  | Optional | `http://localhost:8083`                                                                                                                                        |
| `data-mapper` | `KEYS_DAS_URL`          | URL for the Keys DAS                                                                                                                                                                                                                                    | `string`  | Optional | `http://localhost:8084`                                                                                                                                        |
| `data-mapper` | `CONSENT_DAS_URL`       | URL for the Consent DAS                                                                                                                                                                                                                                 | `string`  | Optional | `http://localhost:8085`                                                                                                                                        |
| `keys-das`    | `DATABASE_URL`          | URL for the Keys DB                                                                                                                                                                                                                                     | `string`  | Required | `postgres://postgres:postgres@localhost:5432/keys_db`                                                                                                          |
| `keys-das`    | `PORT`                  | Port number for the Keys DAS                                                                                                                                                                                                                            | `number`  | Optional | `8084`                                                                                                                                                         |
| `phi-das`     | `DATABASE_URL`          | URL for the PHI DAS                                                                                                                                                                                                                                     | `string`  | Required | `postgres://postgres:postgres@localhost:5432/phi_db`                                                                                                           |
| `phi-das`     | `PORT`                  | Port number for the PHI DAS                                                                                                                                                                                                                             | `number`  | Optional | `8083`                                                                                                                                                         |
| `pi-das`      | `DATABASE_URL`          | URL for the PI DAS                                                                                                                                                                                                                                      | `string`  | Required | `postgres://postgres:postgres@localhost:5432/pi_db`                                                                                                            |
| `pi-das`      | `PORT`                  | Port number for the PI DAS                                                                                                                                                                                                                              | `number`  | Optional | `8082`                                                                                                                                                         |

## Setup

- Install pnpm: `brew install pnpm`
- Install dependencies: `pnpm install`

**WARNING: 🚨🚨 Node v20.x is the latest LTS version, but there is an incompatibility issue with ts-node https://github.com/TypeStrong/ts-node/issues/1997. This repo enforces using Node v18.18.2 to work with ts-node and ECMAScript Modules (ESM). 🚨🚨**

### VS Code Configuration

[Visual Studio Code](https://code.visualstudio.com/) is the recommended code editor for this project. The monorepo contains a [`.vscode` directory](./.vscode/) with a [`settings.schema.json` file](./.vscode/settings.schema.json).

Please **create a copy of the `settings.schema.json` file called `settings.json`**. This will configure VS Code with our recommended settings and enable ESLint fix-on-save, but leaves you free to configure your workspace settings to your preference without committing any changes to the repo.

In addition to downloading VS Code, please ensure that you have the following VS Code Extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

> **Note:** These extensions are also listed in the `recommendations` of the [`extensions.json` file](./.vscode/extensions.json)

> **Additional Note:** If you are using the [Monorepo Workspace extension](https://marketplace.visualstudio.com/items?itemName=folke.vscode-monorepo-workspace) to manage your monorepo in VS Code, you will need to ensure the config from your [`settings.json` file](./.vscode/settings.json) is included in the `"settings"` section of your `<my-workspace>.code-workspace file`, as the workspace file will override the `.vscode` file.

### Special Considerations Regarding ESLint and the Root `package.json` File

Please note that we are currently specifying versions of `@typescript-eslint/parser` and `eslint-plugin-import` in the `overrides` section of the root [`package.json` file](./package.json). This was done to avoid a conflict between the version used by the `eslint-config-next` plugin and our custom ESLint configuration.

## Quickstart - DB, Migrations, and Local Servers

This project uses [Postgres](https://www.postgresql.org/) and [Prisma](https://www.prisma.io/docs) for database management. Local postgres databases for each DAS are provided in the [docker-compose](./docker-compose.yaml). The Prisma Client must be generated before it can be used. You can get everything started by a) manually running [`package.json` scripts](#with-packagejson-scripts), or b) using a [`Make` command](#using-the-makefile):

### With `package.json` Scripts

> **Note**: Run all below commands from the project root folder.

You can initialize the development Postgres DBs for each DAS by running the `docker-compose.yaml` file, with:

```sh
docker-compose up -d
```

Once the databases are ready, you will need to apply the Prisma schema migrations:

```sh
pnpm prisma:migrate:dev
```

> **Note**: The `prisma migrate dev` command is for **development mode only** [(See docs reference)](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production#create-and-apply-migrations)

> **Also note**: You will need to run `prisma migrate dev` (or `pnpm prisma:migrate:dev`) within a specific DAS to create a migration first if you have made changes to that schema, for example: `cd apps/consent-das && pnpm prisma:migrate:dev`

If successful, the script output should indicate which migrations have been applied, and you should see this message: `Your database is now in sync with your schema.`

Running the migrations will also generate the Prisma Client for each DAS, as noted by the output message: `Generated Prisma Client (version number) to ./src/generated/client`. However, in the event that you only need to generate a new client, simply run:

```sh
pnpm prisma:generate
```

Before running the local UI, APIs, and DASes, please ensure you have built the shared packages:

```sh
pnpm build
```

If this is your first time running the DASes, you will likely want to see them with data. To do so, run the `seed` command:

```sh
pnpm prisma:seed
```

Once this is complete, you can start the local UI, APIs, and DASes on their default ports:

```sh
pnpm dev
```

### Using the `Makefile`

You can run all of the above steps with the `make start` command:

```sh
make start
```

To shut down the docker-compose and remove any orphan containers, run `make stop`:

```sh
make stop
```

Verify everything is running correctly by navigating to [`http://localhost:3000`](http://localhost:3000) for the Consent UI and [`http://localhost:8080`](http://localhost:8080/health) for the Consent API.

### Dev Commands

| Command                   | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| **BUILD**                 |                                                              |
| `pnpm build`              | Creates optimized production builds of each app and package  |
| `pnpm build:backend`      | Creates optimized production builds of everything but the UI |
| `pnpm build:consent-ui`   | Creates an optimized production build of the UI              |
| `pnpm build:types`        | Creates an optimized production build of the Types package   |
| **DEV**                   |                                                              |
| `pnpm dev`                | Starts local dev servers for each service                    |
| `pnpm dev:consent-api`    | Starts local dev server for Consent API only                 |
| `pnpm dev:consent-ui`     | Starts local dev server for Consent UI only                  |
| `pnpm dev:das`            | Starts local dev servers for DASes only                      |
| `pnpm dev:data-mapper`    | Starts local dev server for Data Mapper only                 |
| **LINT**                  |                                                              |
| `pnpm lint`               | Runs ESLint on each app and package                          |
| **PRISMA**                |                                                              |
| `pnpm prisma:generate`    | Generates Prisma Clients for each of the DASes               |
| `pnpm prisma:migrate:dev` | Runs dev migrations on each of the DASes                     |
| `pnpm prisma:seed`        | Seeds data into each of the DASes                            |
| **START**                 |                                                              |
| `pnpm start`              | Runs production builds of each service                       |
| `pnpm start:build`        | Creates production builds of each service and then runs them |
| `pnpm start:dev`          | Runs local dev servers for each service                      |
| `pnpm start:migrate:dev`  | Runs dev migrations, then runs local dev servers             |
| **TEST**                  |                                                              |
| `pnpm test`               | Runs all test suites                                         |
| `pnpm test:coverage`      | Reports test coverage                                        |

## ReCAPTCHA

In local dev, for consent UI & API:

- Use [Google's test keys](https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha.-what-should-i-do) - secret key for API, site key for UI.
- No ReCAPTCHA token is required for consent API, in development. If one isn't provided, the ReCAPTCHA verification process will be skipped. If you provide any token, the verification process will take place and verification will always be successful.
