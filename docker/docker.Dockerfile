# Build angular------------------
FROM node:lts-alpine3.20 AS build

RUN npm install -g @angular/cli

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]