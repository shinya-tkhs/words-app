FROM node:12-slim

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN yarn install --production

COPY src ./

CMD ["yarn", "hello"]
