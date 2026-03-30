FROM debian:bookworm

# Imposta le variabili di ambiente per evitare interattività durante l'installazione
ENV DEBIAN_FRONTEND=noninteractive

# Aggiorna il sistema e installa Nginx
RUN apt-get update && apt-get install -y nginx openssl && apt-get clean \
	&& mkdir -p /etc/nginx/certs \
	&& openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout \
	/etc/nginx/certs/server.key -out /etc/nginx/certs/server.crt -subj \
	"/C=IT/ST=Rome/L=Rome/O=42RomaLuiss/OU=lde-mich/CN=lde-mich.42.fr"

#copia il file conf di nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./browser /var/www/html

# Comando per avviare Nginx
CMD ["nginx", "-g", "daemon off;"]
