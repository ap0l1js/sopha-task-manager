FROM node:19-slim AS base

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

ENV NODE_ENV=development

COPY --chown=node:node package.json package-lock.json ./

RUN npm install --force

COPY --chown=node:node . .

CMD ["npm", "run", "dev"]

