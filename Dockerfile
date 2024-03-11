FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN yarn

CMD [ "yarn", "start"]
# CMD [ "yarn", "dev"]

