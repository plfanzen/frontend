FROM oven/bun:1 AS build

RUN apt update && apt install -y curl

RUN curl -sfLS https://install-node.vercel.app | bash -s -- 24 -y

ARG BUILD_TYPE

WORKDIR /build
COPY . .

RUN bun install

ENV GRAPHQL_ENDPOINT_SERVER http://api:3000/graphql
ENV GRAPHQL_ENDPOINT_CLIENT /api/graphql
ENV WS_ENDPOINT /api/graphql

RUN NITRO_PRESET=node_cluster node node_modules/.bin/nuxi build

RUN rm -rf .output/server/node_modules

RUN cd .output/server && \
    bun install

FROM node:24

WORKDIR /app
COPY --from=build --chown=node:node /build/.output .

EXPOSE 3000
ENV WS_ENDPOINT /api/graphql

CMD [ "./server/index.mjs" ]
