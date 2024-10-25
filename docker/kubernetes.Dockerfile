# Build angular------------------
FROM node:lts-alpine3.20 AS build

RUN npm install -g @angular/cli

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

COPY ./docker/base-url.ts ./src/app/utils/base-url.ts

RUN npm run build

# NGINX runner---------------
FROM nginx:1.21-alpine

COPY --from=build /app/dist/pi-sd-frontend/browser /usr/share/nginx/html

COPY ./docker/nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80 4200

CMD ["nginx", "-g", "daemon off;"]