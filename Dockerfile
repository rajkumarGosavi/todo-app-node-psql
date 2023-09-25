FROM node:18-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

COPY --chown=node:node package.json .
COPY --chown=node:node . .
RUN npm install

EXPOSE 8080

CMD [ "node", "server.js" ]