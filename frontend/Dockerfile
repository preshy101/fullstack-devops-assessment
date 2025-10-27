
# Multi-stage build: build React app then serve with nginx
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# if using yarn: COPY yarn.lock ./
RUN npm ci
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build

# Nginx stage
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# default nginx behaviour will serve static content
# copy custom nginx config if provided (optional)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]