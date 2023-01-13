#!/bin/sh
echo -n "" > /usr/share/nginx/html/dist/config.js

echo 'window.Config = {};' >> /usr/share/nginx/html/dist/config.js
echo 'window.Config.domain = "'${DOMAIN}'";' >> /usr/share/nginx/html/dist/config.js
echo 'window.Config.grafana_reports = "'${GRAFANA_REPORTS}'";' >> /usr/share/nginx/html/dist/config.js
echo 'window.Config.namespace = "'${NAMESPACE}'";' >> /usr/share/nginx/html/dist/config.js
echo 'window.Config.showSidePanel = "'${SHOW_SIDE_PANEL}'";' >> /usr/share/nginx/html/dist/config.js
echo 'window.Config.demo_email = "'${DEMO_EMAIL}'";' >> /usr/share/nginx/html/dist/config.js
echo 'window.Config.demo_password = "'${DEMO_PASSWORD}'";' >> /usr/share/nginx/html/dist/config.js

nginx -g 'daemon off;'
