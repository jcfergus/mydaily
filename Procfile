api: bin/rails server
ui: cd frontend && npm run dev
codegen: sleep 5 && cd frontend && npm run codegen-watch
webserver: nginx -c `pwd`/nginx.conf -e stderr -g 'daemon off;'
daemon off;
