# syntax=docker/dockerfile:1

FROM node:lts-alpine
WORKDIR /movinin/backend
COPY ./backend ./
COPY ./packages /movinin/packages
RUN mkdir -p /var/www/cdn/movinin/users
RUN mkdir -p /var/www/cdn/movinin/temp/users
RUN mkdir -p /var/www/cdn/movinin/properties
RUN mkdir -p /var/www/cdn/movinin/temp/properties
RUN npm install
RUN npm run setup
CMD [ "npm", "start"]
EXPOSE 4004
