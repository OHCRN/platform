# Docker Usage

[Docker](https://www.docker.com/) is used for building and deploying services seamlessly across different environments. The project employs Docker through two main components:
- i) the [`Dockerfile`](../Dockerfile) for building service images
- ii) the [`docker-compose.yaml`](../docker-compose.yaml) for orchestrating containers

## Local Development with Docker Compose

For local development, running the PostgreSQL databases for the DASes is simplified to a single command:

```bash
docker compose up -d
```

However, for a deeper understanding of the project's Docker use, continue reading to explore the `Dockerfile`, `docker-compose.yaml`, and related functionalities.

## Dockerfile and Image Building

The project's `Dockerfile` is structured as a multi-stage build, building images for each backend service (`consent-api`, `data-mapper`, `pi-das`, `phi-das`, `keys-das`, `consent-das`) and the UI (`consent-ui`).

To build an individual service, specify the target using the `--target` argument with `docker build`. For example, to build an image of the `consent-ui`:

```bash
docker build --target consent-ui .
```

Refer to the [Docker documentation on multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/) for more details.

## Docker Compose and Service Orchestration

The `docker-compose.yaml` file manages services for PostgreSQL (`postgres`) and backend services (`consent-api`, `data-mapper`, `pi-das`, `phi-das`, `keys-das`, `consent-das`).

By default, the PostgreSQL service can be started using:

```bash
docker compose up -d
```

Utilizing Docker Compose **profiles**, testing configurations (`backend` and `das`) can be activated with:

```bash
docker compose --profile <profile> up -d
```

The `backend` profile runs all backend services, whereas the `das` profile runs only the DASes.

> **Note: These profiles are intended for testing, not local development.**

Developers are encouraged to run backend services locally with `pnpm`. Once the Dev/QA environment is active, developers can point their local UI/API at the Dev/QA environment instead.

## Prisma and Docker Compatibility

To address Prisma compatibility issues when running within Docker, adjustments in `schema.prisma` are needed.

The default behaviour of Prisma is to generate a native client for the system that is running the `prisma generate` command. For example, an Apple Silicon Mac will generate an arm64 client, and an x86 Linux machine will generate an x86 client. This poses a problem when building a docker image locally on your Mac and attempting to run it inside a Linux docker container.


We specify both `native` and `linux` binary targets to ensure compatibility across systems when building locally and running in a Linux Docker container. See the [Prisma documentation on binaryTargets](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#binary-targets) for further details.

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/client"
  binaryTargets = ["native", "linux-musl-arm64-openssl-3.0.x"]
}
```
