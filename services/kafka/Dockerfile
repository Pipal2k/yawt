FROM node:current-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY services/kafka/package.json  ./

RUN npm install --production

COPY ["moleculer.config.js", "./"]
COPY ./services/kafka/kafka-controller.service.js ./services/

CMD ["npm", "start"]