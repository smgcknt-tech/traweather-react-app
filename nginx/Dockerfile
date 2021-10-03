FROM nginx
RUN rm -f /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 80
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf