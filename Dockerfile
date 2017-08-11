FROM node:alpine

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

COPY package.json /var/www/app
RUN npm install

COPY . /var/www/app

ENV PG=America/Chicago
ENV PGTZ=America/Chicago
ENV NODE_ENV=stg

CMD PORT=$PORT npm run start