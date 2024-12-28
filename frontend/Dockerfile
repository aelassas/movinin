# syntax=docker/dockerfile:1

FROM node:lts-alpine as build
WORKDIR /movinin/frontend
COPY ./frontend ./
COPY ./frontend/.env.docker .env
COPY ./packages /movinin/packages
RUN npm install --force
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf -- *
COPY --from=build /movinin/frontend/build .
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
