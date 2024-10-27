#!/usr/bin/env bash

if [ "$1" == "all" ]; then
  /bin/bash /opt/movinin/__scripts/mi-deploy-api.sh
  /bin/bash /opt/movinin/__scripts/mi-deploy-backend.sh
  /bin/bash /opt/movinin/__scripts/mi-deploy-frontend.sh
elif [ "$1" == "ui" ]; then
  /bin/bash /opt/movinin/__scripts/mi-deploy-backend.sh
  /bin/bash /opt/movinin/__scripts/mi-deploy-frontend.sh
elif [ "$1" == "api" ]; then
  /bin/bash /opt/movinin/__scripts/mi-deploy-api.sh
elif [ "$1" == "backend" ]; then
  /bin/bash /opt/movinin/__scripts/mi-deploy-backend.sh
elif [ "$1" == "frontend" ]; then
  /bin/bash /opt/movinin/__scripts/mi-deploy-frontend.sh
else
  echo "Usage: mi-deploy all|ui|api|backend|frontend"
fi
