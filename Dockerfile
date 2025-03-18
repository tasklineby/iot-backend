FROM node:alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm cache clean --force
RUN npm ci

COPY --chown=node:node . .

CMD ["node", "dist/index"]