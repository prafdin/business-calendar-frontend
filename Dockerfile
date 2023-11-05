FROM node:16-alpine as build

WORKDIR /var/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.18.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /var/src/app/dist/business-calendar /var/www/site