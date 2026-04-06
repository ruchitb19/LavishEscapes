# Multi-stage Dockerfile for the frontend

# Stage 1: Build (Mock build stage if required later for frameworks, currently just copies)
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
# If we had a build step, it would go here (e.g. npm run build).

# Stage 2: Serve using NGINX
FROM nginx:alpine
# Copy the custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the static assets from the build stage
COPY --from=build /app/index.html /usr/share/nginx/html/index.html
COPY --from=build /app/script.js /usr/share/nginx/html/script.js
COPY --from=build /app/assets /usr/share/nginx/html/assets
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
