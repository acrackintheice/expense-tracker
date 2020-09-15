server {
        listen 80;
        listen [::]:80;

        root /var/www/html;

        server_name hasura.acrackintheice.com;

        ssl_certificate           /etc/nginx/cert.crt;
    	ssl_certificate_key       /etc/nginx/cert.key;
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers         HIGH:!aNULL:!MD5;

        location / {
          proxy_pass http://localhost:8082;
          proxy_http_version 1.1;

          proxy_ssl_certificate           /etc/nginx/cert.crt;
    	  proxy_ssl_certificate_key       /etc/nginx/cert.key;

          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection $connection_upgrade;
          proxy_set_header Host $host;
        }
}