FROM node:20.18.0-alpine

RUN apk add --no-cache git

WORKDIR /app

RUN git clone https://github.com/Grupo-5-High-Five/discharge-web.git .

RUN npm install

CMD node --watch app.js

EXPOSE 3333