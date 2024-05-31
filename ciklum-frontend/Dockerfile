FROM httpd:alpine
COPY dist/gestion-usuarios/ /usr/local/apache2/htdocs/
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf
