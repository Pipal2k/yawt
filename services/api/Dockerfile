FROM node:current-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY services/api/package.json  ./

RUN npm install --production

COPY ["moleculer.config.js", "./"]
COPY ./services/api/api.service.js ./services/
COPY public ./public/
#COPY . .
#COPY moleculer.config.js ./

CMD ["npm", "start"]