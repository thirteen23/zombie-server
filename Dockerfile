FROM node:alpine

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

COPY package.json /var/www/app
RUN npm install

COPY . /var/www/app

ENV PG=America/Chicago
ENV PGTZ=America/Chicago
ENV NODE_ENV=stg

EXPOSE 9001

CMD PORT=9001 npm run start