# build stage
FROM node:14.18.1-alpine3.13 as build-stage
WORKDIR /app
COPY . ./
RUN npm install
RUN ls -la
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app /usr/share/nginx/html

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
CMD ["/bin/sh", "-c", "/entrypoint.sh"]