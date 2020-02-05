FROM node:dubnium

RUN apt-get upgrade \
    && apt-get update

WORKDIR /usr/src/app

COPY src/ ./src
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install --production

ENTRYPOINT [ "npm", "start" ]
