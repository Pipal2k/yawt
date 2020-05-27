FROM node:current-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY services/greeter/package.json  ./

RUN npm install --production

COPY ["moleculer.config.js", "./"]
COPY ./services/greeter/greeter.service.js ./services/

CMD ["npm", "start"]