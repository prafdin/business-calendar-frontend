FROM node:16-alpine as build

WORKDIR /var/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.18.0-alpine
COPY --from=build /var/src/app/dist/business-calendar /usr/share/nginx/html