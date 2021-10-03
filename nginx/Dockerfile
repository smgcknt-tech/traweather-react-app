FROM ubuntu:latest
RUN apt update
RUN apt install nginx -y
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
EXPOSE 80
CMD ["/usr/sbin/nginx"]

