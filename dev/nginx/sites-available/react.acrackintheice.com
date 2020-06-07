server {
        listen 80;
        listen [::]:80;

        root /var/www/html;
        
        server_name react.acrackintheice.com www.react.acrackintheice.com;

        location / {
          proxy_pass http://localhost:8083;
        }
}
