# Dockerfile
FROM nginx:latest

COPY build-artifacts /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
