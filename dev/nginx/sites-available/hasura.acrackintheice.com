server {
        listen 80;
        listen [::]:80;

        root /var/www/html;

        server_name hasura.acrackintheice.com;

        location / {
          proxy_pass http://localhost:8082;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection $connection_upgrade;
          proxy_set_header Host $host;
        }
}
