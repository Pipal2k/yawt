FROM node:current-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY services/coordinator/package.json  ./

RUN npm install --production

COPY ["moleculer.config.js", "./"]
COPY ./services/coordinator/coordinator.service.js ./services/

CMD ["npm", "start"]
