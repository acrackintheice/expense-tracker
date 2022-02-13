server {
        listen 80;
        listen [::]:80;
        listen 443;
        listen [::]:443;

        server_name react.acrackintheice.com www.react.acrackintheice.com;

        ssl_certificate           /etc/nginx/cert.crt;
    	  ssl_certificate_key       /etc/nginx/cert.key;

    	  ssl on;
    	  ssl_session_cache  builtin:1000  shared:SSL:10m;
    	  ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
    	  ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
    	  ssl_prefer_server_ciphers on;

        root /var/www/html;

        location / {
          proxy_pass http://localhost:8083 http://;
          proxy_redirect http://localhost:8083 https://react.acrackintheice.com;
        }
}