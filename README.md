# Protector Bot

## About

<p>Protector is a bot that secures your server by allowing members to gain access to a certain role upon completion of a captcha sent in the members DM</p>

## Running

### Requirements

- Node.js v14+
- Typescript 4.1.3
- Docker 20.10.2
- MongoDB Database

### Setup

- Make sure you're running the requirements mentioned above

```sh
node -v && tsc -v && mongo -version && docker --version
# v14.15.4
# Version 4.1.3
# MongoDB shell version v4.4.3
# Docker version 20.10.2, build 2291f61
```

- Clone the respository

```sh
$ git clone https://github.com/nerdthatnoonelikes/protector
```

- Install all dependencies and install typescript

```sh
$ cd protector
$ yarn && yarn global add typescript
```

- Add the configuration file

```sh
# Assuming you are in the protector directory
vim config.ts
# Example config.ts
# export const token: string = "token"
# export const owner: string = "some user id"
# export const mongoDB: string = "some mongodb connection url"
```

- Running the bot (1st way)

```sh
# Assuming everything was done right
$ yarn build
```

- Run the bot (2nd way)

```sh
# If for whatever reason you wish not to run the bot with docker
# Still assuming you're in the protector directory
$ yarn start
```
