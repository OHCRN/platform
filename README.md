# OHCRN Platform

[![TypeScript](https://img.shields.io/badge/types-%20TypeScript-blue)](https://www.typescriptlang.org/)

<!-- [![Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://prettier.io/) -->

<!-- | Release    | Build Status                                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Edge**   | [![Build Status](https://jenkins.qa.cancercollaboratory.org/buildStatus/icon?job=ARGO%2Fui%2Fdevelop)](https://jenkins.qa.cancercollaboratory.org/job/ARGO/job/ui/job/develop/) |
| **Latest** | [![Build Status](https://jenkins.qa.cancercollaboratory.org/buildStatus/icon?job=ARGO%2Fui%2Fmaster)](https://jenkins.qa.cancercollaboratory.org/job/ARGO/job/ui/job/master/)   | -->

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
└── packages/
    ├── common/                     ← Shared Validation & Types
    │   └── src
    ├── config/
    │   └── eslint-config-ohcrn     ← Shared ESLint Config
    └── logger/                     ← Shared Logger
        └── src
```

### Writing Commits

To keep commit messages consistent, we use [gitmoji](https://gitmoji.dev). To easily access emojis on Mac, press ctrl+cmd+space.

<!--
### Type checking

- `npm run type-check`: trigger TypeScript type check for whole repo
- `npm run type-check -- --watch`: runs the above with watch mode
  - Any `npm run type-check` triggers `tsc`, so any flag layed out [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html) can be used
- If using [vscode](https://code.visualstudio.com/) (recommended), `tsc` can also be run as a task in the editor:
  - `Cmd+Shift+B`, then select `tsc:build - tsconfig.json`
  - This will report errors in vscode's `PROBLEMS` tab -->

## Local Development

To run the setup locally, ensure you have provided the **required** environment variables, as described in [Environment Variables](#environment-variables). Each package has an `.env.schema` file for reference.

- In the [`/apps/consent-api/` folder](./apps/consent-api/), create an `.env` file
- In the [`/apps/consent-das/` folder](./apps/consent-das/), create an `.env` file
- In the [`/apps/consent-ui/` folder](./apps/consent-ui/), create and `.env.local` file
- In the [`/apps/data-mapper/` folder](./apps/data-mapper/), create an `.env` file
- In the [`/apps/keys-das/` folder](./apps/keys-das/), create an `.env` file
- In the [`/apps/phi-das/` folder](./apps/phi-das/), create an `.env` file
- In the [`/apps/pi-das/` folder](./apps/pi-das/), create an `.env` file

## Environment Variables

| Package       | Name              | Description                     | Type     | Required | Default                                                |
| ------------- | ----------------- | ------------------------------- | -------- | -------- | ------------------------------------------------------ |
| `consent-api` | `PORT`            | Port number for the Consent API | `number` | Optional | `8080`                                                 |
| `consent-das` | `DATABASE_URL`    | URL for the Consent DB          | `string` | Required | postgres://postgres:postgres@localhost:5432/consent_db |
| `consent-das` | `PORT`            | Port number for the Consent DAS | `number` | Optional | `8085`                                                 |
| `data-mapper` | `PORT`            | Port number for the Data Mapper | `number` | Optional | `8081`                                                 |
| `data-mapper` | `PI_DAS_URL`      | URL for the PI DAS              | `string` | Optional | http://localhost:8082                                  |
| `data-mapper` | `PHI_DAS_URL`     | URL for the PHI DAS             | `string` | Optional | http://localhost:8083                                  |
| `data-mapper` | `KEYS_DAS_URL`    | URL for the Keys DAS            | `string` | Optional | http://localhost:8084                                  |
| `data-mapper` | `CONSENT_DAS_URL` | URL for the Consent DAS         | `string` | Optional | http://localhost:8085                                  |
| `keys-das`    | `DATABASE_URL`    | URL for the Keys DB             | `string` | Required | postgres://postgres:postgres@localhost:5432/keys_db    |
| `keys-das`    | `PORT`            | Port number for the Keys DAS    | `number` | Optional | `8084`                                                 |
| `phi-das`     | `DATABASE_URL`    | URL for the PHI DAS             | `string` | Required | postgres://postgres:postgres@localhost:5432/phi_db     |
| `phi-das`     | `PORT`            | Port number for the PHI DAS     | `number` | Optional | `8083`                                                 |
| `pi-das`      | `DATABASE_URL`    | URL for the PI DAS              | `string` | Required | postgres://postgres:postgres@localhost:5432/pi_db      |
| `pi-das`      | `PORT`            | Port number for the PI DAS      | `number` | Optional | `8082`                                                 |

## Setup

- Install pnpm: `brew install pnpm`
- Install dependencies: `pnpm install`

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

### How to reset node_modules

To execute `rm -rf node_modules` on all repos in this monorepo:

```sh
npm run reset-node-modules
```

To remove cached dependencies from pnpm:

```sh
pnpm store prune
```

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
pnpm run migrate-dev
```

> **Note**: The `prisma migrate dev` command is for **development mode only** [(See docs reference)](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production#create-and-apply-migrations)

> **Also note**: You will need to run `prisma migrate dev` (or `pnpm run migrate-dev`) within a specific DAS to create a migration first if you have made changes to that schema, for example: `cd apps/consent-das && pnpm run migrate-dev`

If successful, the script output should indicate which migrations have been applied, and you should see this message: `Your database is now in sync with your schema.`

Running the migrations will also generate the Prisma Client for each DAS, as noted by the output message: `Generated Prisma Client (version number) to ./src/generated/client`. However, in the event that you only need to generate a new client, simply run:

```sh
pnpm run generate
```

Before running the local UI, APIs, and DASes, please ensure you have built the shared packages:

```sh
pnpm run build
```

If this is your first time running the DASes, you will likely want to see them with data. To do so, run the `seed` command:

```sh
pnpm run seed
```

Once this is complete, you can start the local UI, APIs, and DASes on their default ports:

```sh
pnpm run dev
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

### Dev Commands:

| Command                    | Description                                                     |
| -------------------------- | --------------------------------------------------------------- |
| `pnpm run dev`             | starts local dev servers for each service                       |
| `pnpm run build`           | builds production Consent UI, API, DASes, Type defs, and Logger |
| `pnpm run consent-ui-dev`  | starts local Consent UI only                                    |
| `pnpm run consent-api-dev` | starts local Consent API only                                   |
| `pnpm run das-dev`         | starts local DASes only                                         |
| `pnpm run data-mapper-dev` | starts local Data Mapper only                                   |
| `pnpm run migrate-dev`     | runs migrations for the DASes                                   |
| `pnpm run generate`        | generates Prisma Clients for the DASes                          |
| `pnpm run seed`            | seeds data into the DASes                                       |
| `pnpm run start`           | runs migrations, then builds, then starts local dev servers     |
