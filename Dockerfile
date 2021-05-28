FROM node:16

ENV PORT 80

EXPOSE 80

WORKDIR /usr/src/app

COPY ./src/package*.json ./

RUN npm i

COPY ./src/ .

CMD [ "npm", "start" ]
