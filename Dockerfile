# see https://catalog.redhat.com/software/containers/ubi9/nginx-122/63f7653b9b0ca19f84f7e9a1
FROM registry.access.redhat.com/ubi9/nginx-122:latest

# Copy the Vue.js app artifact from the GitHub Actions artifact
COPY ./dist/. /opt/app-root/src

# Command to start Nginx and keep the process running
CMD ["nginx", "-g", "daemon off;"]
