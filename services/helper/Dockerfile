FROM node:current-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY services/helper/package.json  ./

RUN npm install --production

COPY ["moleculer.config.js", "./"]
COPY ./services/helper/helper.service.js ./services/

CMD ["npm", "start"]