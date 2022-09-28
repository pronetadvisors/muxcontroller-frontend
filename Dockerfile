# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
# Copy all project files to this container and build
# To ignore files like node_modules, dist, use .dockerignore file
COPY . .

RUN npm run create-env

RUN ls
RUN cat .env

RUN npm run build


# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Alter Nginx to receive traffic on 8080 instead. Refer below explaination
# Copy the respective nginx configuration files
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
# Expose container port 8080
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]