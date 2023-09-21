# Use ARG before first build-stage to act as global variables
ARG WORKDIR=/usr/src/ohcrn/platform
ARG APP_USER=ohcrn

#######################################################
# Configure Base Image
#######################################################
FROM node:lts-alpine AS base

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
RUN pnpm run build

#######################################################
# Common Types Package
#######################################################
FROM base AS common

ARG APP_USER
ARG WORKDIR
ARG COMMON_DIR=${WORKDIR}/packages/common

WORKDIR ${COMMON_DIR}

USER ${APP_USER}

COPY --from=prod-deps ${COMMON_DIR}/node_modules/ ./node_modules
COPY --from=build ${COMMON_DIR}/dist ./dist

#######################################################
# Consent UI
#######################################################
FROM common AS consent-ui

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
