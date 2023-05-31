#!/bin/bash

# Check for all mandatory environment variables exist before running application
#             REACT_APP_API_HOST \
#             REACT_APP_API_PORT \
#             REACT_APP_STAGE \
#             APIGW_INTERNAL \
#             APIGW_KEY

bash /app/scripts/getEnv.sh

envsubst '${REACT_APP_APIGW_URL}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

nginx -t
nginx -g "daemon off;"
