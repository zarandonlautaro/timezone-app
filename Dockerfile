FROM node:12.18.2-alpine3.12

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY . /api/

EXPOSE 3000

CMD [ "npm","run","start" ]
