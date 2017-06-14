FROM node:alpine

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

COPY package.json /var/www/app
RUN npm install

COPY . /var/www/app

EXPOSE 9001

CMD NODE_ENV=prd npm run start