# Use ARG before first build-stage to act as global variables
ARG WORKDIR=/usr/src/ohcrn/platform
ARG APP_USER=ohcrn

#######################################################
# Configure Base Image
#######################################################
FROM node:18.18.2-alpine AS base

ARG APP_USER
ARG WORKDIR

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Install pnpm
RUN npm i -g pnpm

# Create our own user to run node, don't run node in production as root
ENV APP_UID=9999
ENV APP_GID=9999
RUN addgroup -S -g $APP_GID ${APP_USER} \
	&& adduser -S -u $APP_UID -g $APP_GID ${APP_USER} \
	&& mkdir -p ${WORKDIR}

WORKDIR ${WORKDIR}
COPY . ./

RUN chown -R ${APP_USER}:${APP_USER} ${WORKDIR}

USER ${APP_USER}

#######################################################
# Install Prod Dependencies
#######################################################
FROM base AS prod-deps

ARG APP_USER
ARG WORKDIR

USER ${APP_USER}

RUN pnpm install --prod --frozen-lockfile

#######################################################
# Build All Workspaces
#######################################################
FROM base AS build

ARG APP_USER
ARG WORKDIR

WORKDIR ${WORKDIR}

# Build flag for Next.js to build the app in standalone mode
ENV BUILD_STANDALONE=true
ENV NEXT_TELEMETRY_DISABLED=1

USER ${APP_USER}

RUN pnpm install --frozen-lockfile
RUN pnpm prisma:generate
RUN pnpm build

#######################################################
# Consent UI
#######################################################
FROM base AS consent-ui

ARG APP_USER
ARG WORKDIR
ARG CONSENT_UI_DIR=${WORKDIR}/apps/consent-ui

WORKDIR ${CONSENT_UI_DIR}

USER ${APP_USER}

COPY --from=prod-deps ${CONSENT_UI_DIR}/node_modules/ ./node_modules
COPY --from=build ${CONSENT_UI_DIR}/.next/standalone ./
COPY --from=build ${CONSENT_UI_DIR}/.next/static ./apps/consent-ui/.next/static

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["node", "apps/consent-ui/server.js"]

#######################################################
# Consent API
#######################################################
FROM base AS consent-api

ARG APP_USER
ARG WORKDIR
ARG CONSENT_API_DIR=${WORKDIR}/apps/consent-api

WORKDIR ${CONSENT_API_DIR}

USER ${APP_USER}

COPY --from=prod-deps ${CONSENT_API_DIR}/node_modules/ ./node_modules
COPY --from=build ${CONSENT_API_DIR}/src ./src
# Required for ts-node
COPY --from=build ${WORKDIR}/node_modules ${WORKDIR}/node_modules

EXPOSE 8080

CMD ["pnpm", "start"]

#######################################################
# Data Mapper
#######################################################
FROM base AS data-mapper

ARG APP_USER
ARG WORKDIR
ARG DATA_MAPPER_DIR=${WORKDIR}/apps/data-mapper

WORKDIR ${DATA_MAPPER_DIR}

USER ${APP_USER}

COPY --from=prod-deps ${DATA_MAPPER_DIR}/node_modules/ ./node_modules
COPY --from=build ${DATA_MAPPER_DIR}/src ./src
# Required for ts-node
COPY --from=build ${WORKDIR}/node_modules ${WORKDIR}/node_modules

EXPOSE 8081

CMD ["pnpm", "start"]

#######################################################
# PI DAS
#######################################################
FROM base AS pi-das

ARG APP_USER
ARG WORKDIR
ARG PI_DAS_DIR=${WORKDIR}/apps/pi-das

WORKDIR ${PI_DAS_DIR}

USER ${APP_USER}

COPY --from=prod-deps ${PI_DAS_DIR}/node_modules/ ./node_modules
COPY --from=build ${PI_DAS_DIR}/src ./src
COPY --from=build ${PI_DAS_DIR}/prisma ./prisma
# Required for ts-node
COPY --from=build ${WORKDIR}/node_modules ${WORKDIR}/node_modules

EXPOSE 8082

CMD ["pnpm", "start:migrate:prod"]

#######################################################
# PHI DAS
#######################################################
FROM base AS phi-das

ARG APP_USER
ARG WORKDIR
ARG PHI_DAS_DIR=${WORKDIR}/apps/phi-das

WORKDIR ${PHI_DAS_DIR}

USER ${APP_USER}

COPY --from=prod-deps ${PHI_DAS_DIR}/node_modules/ ./node_modules
COPY --from=build ${PHI_DAS_DIR}/src ./src
COPY --from=build ${PHI_DAS_DIR}/prisma ./prisma
# Required for ts-node
COPY --from=build ${WORKDIR}/node_modules ${WORKDIR}/node_modules

EXPOSE 8083

CMD ["pnpm", "start:migrate:prod"]

#######################################################
# Keys DAS
#######################################################
FROM base AS keys-das

ARG APP_USER
ARG WORKDIR
ARG KEYS_DAS_DIR=${WORKDIR}/apps/keys-das

WORKDIR ${KEYS_DAS_DIR}

USER ${APP_USER}

COPY --from=prod-deps ${KEYS_DAS_DIR}/node_modules/ ./node_modules
COPY --from=build ${KEYS_DAS_DIR}/src ./src
COPY --from=build ${KEYS_DAS_DIR}/prisma ./prisma
# Required for ts-node
COPY --from=build ${WORKDIR}/node_modules ${WORKDIR}/node_modules

EXPOSE 8084

CMD ["pnpm", "start:migrate:prod"]

#######################################################
# Consent DAS
#######################################################
FROM base AS consent-das

ARG APP_USER
ARG WORKDIR
ARG CONSENT_DAS_DIR=${WORKDIR}/apps/consent-das

WORKDIR ${CONSENT_DAS_DIR}

USER ${APP_USER}

COPY --from=prod-deps ${CONSENT_DAS_DIR}/node_modules/ ./node_modules
COPY --from=build ${CONSENT_DAS_DIR}/src ./src
COPY --from=build ${CONSENT_DAS_DIR}/prisma ./prisma
# Required for ts-node
COPY --from=build ${WORKDIR}/node_modules ${WORKDIR}/node_modules

EXPOSE 8085

CMD ["pnpm", "start:migrate:prod"]
