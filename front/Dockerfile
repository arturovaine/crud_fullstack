# Dev
FROM node:20.11.0 AS build-stage
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run dev

# Build
# FROM node:20.11.0 AS build-stage
# WORKDIR /src
# COPY package*.json ./
# RUN npm install
# COPY ./ ./
# RUN npm run build

# Production
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
