server {
        listen 80;
        listen [::]:80;

        root /var/www/html;

        server_name api.acrackintheice.com www.api.acrackintheice.com;

        location / {
          proxy_pass http://localhost:8080;
        }
}
