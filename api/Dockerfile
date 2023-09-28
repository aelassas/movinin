# syntax=docker/dockerfile:1

FROM node:lts-alpine
WORKDIR /movinin/api
COPY ./api ./
COPY ./packages /movinin/packages
RUN mkdir -p /var/www/cdn/movinin/users
RUN mkdir -p /var/www/cdn/movinin/temp/users
RUN mkdir -p /var/www/cdn/movinin/properties
RUN mkdir -p /var/www/cdn/movinin/temp/properties
RUN npm install --omit=dev
CMD [ "npm", "start"]
EXPOSE 4004
