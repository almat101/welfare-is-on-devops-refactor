FROM node:25.8-alpine3.23 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod


FROM nginx:1.29.6-alpine AS runtime

RUN apk update && apk upgrade && apk add --no-cache curl openssl vim sudo net-tools

RUN mkdir -p /etc/nginx/certs

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/certs/welfare.key -out /etc/nginx/certs/welfare.crt \
  -subj "/C=IT/ST=Italy/L=Rome/O=Dev/CN=localhost"

COPY --from=build /app/dist/leonardo-hug-ui/browser /usr/share/nginx/html

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

# Permessi necessari all'utente non-root nginx
RUN chown -R nginx:nginx /etc/nginx/certs /var/cache/nginx /run

# # Soluzione DS-0002: utente non root
USER nginx

# Soluzione DS-0026: aggiunta Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f -s -k https://localhost/ping || exit 1

CMD ["nginx", "-g", "daemon off;"]
