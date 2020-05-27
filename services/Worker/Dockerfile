FROM node:current-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY services/Worker/package.json  ./

RUN npm install --production

COPY ["moleculer.config.js", "./"]
COPY ./services/Worker/worker.service.js ./services/

CMD ["npm", "start"]