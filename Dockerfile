# Dockerfile
FROM nginx:latest

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the Vue.js app artifact from the GitHub Actions artifact
COPY ./wjh/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start Nginx and keep the process running
CMD ["nginx", "-g", "daemon off;"]
