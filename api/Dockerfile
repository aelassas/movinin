# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /movinin/api
COPY . .
RUN mkdir -p /var/www/cdn/movinin/users
RUN mkdir -p /var/www/cdn/movinin/temp/users
RUN mkdir -p /var/www/cdn/movinin/cars
RUN mkdir -p /var/www/cdn/movinin/temp/cars
RUN npm install --omit=dev
CMD [ "npm", "start"]
EXPOSE 4002
