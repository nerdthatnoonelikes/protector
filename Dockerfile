FROM node:14.15-alpine3.13

WORKDIR /usr/bot

COPY . .

RUN yarn

CMD ["yarn", "start"]