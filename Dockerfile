FROM node:current-alpine

WORKDIR /app

COPY package.json /app
COPY helloworld.js /app

RUN npm i

CMD [ "node", "helloworld.js" ]