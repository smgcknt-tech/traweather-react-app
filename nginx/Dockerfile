FROM ubuntu:latest
RUN apt update
RUN apt install nginx -y
RUN rm -v /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY index.html /var/www/html/
EXPOSE 80
CMD ["/usr/sbin/nginx"]
