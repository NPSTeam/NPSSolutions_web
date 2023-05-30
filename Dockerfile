# Stage 1, based on Node.js, to build and compile the react app
FROM node:14 as build
RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
COPY ./ /app/
COPY /target/fullchain.pem /app/ssl/fullchain.pem
COPY /target/privkey.pem /app/ssl/privkey.pem

RUN yarn install \
    && yarn prebuild \
    && yarn generate-build-meta \
    && yarn build

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17-alpine

RUN mkdir -p /app
WORKDIR /app

RUN apk add --update bash jq curl dos2unix \
    && rm -rf /var/cache/apk/*



COPY --from=build /app/build/ /app/build

COPY internals/scripts /app/scripts
COPY public/  /app/public
COPY ./nginx.conf.template /etc/nginx/conf.d/nginx.conf.template

RUN chmod +x /app/scripts/getEnv.sh \
    && chmod +x /app/scripts/run.sh \
    && dos2unix /app/scripts/getEnv.sh \
    && dos2unix /app/scripts/run.sh

CMD ["/bin/bash", "-c", "/app/scripts/run.sh"]