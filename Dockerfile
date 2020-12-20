FROM node:15.0.1-alpine

WORKDIR /app

COPY package.json yarn.lock src /app/

RUN cd /app \
    && yarn install --pure-lockfile

EXPOSE 3000