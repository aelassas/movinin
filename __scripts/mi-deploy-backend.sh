#!/bin/bash

start_time=$(date +%s)
echo "Deploying Movin' In backend..."

cd /opt/movinin
git pull
sudo chmod +x -R /opt/movinin/__scripts

cd /opt/movinin/backend
sudo rm -rf build

npm install
npm run build

sudo rm -rf /var/www/movinin/backend
sudo mkdir -p /var/www/movinin/backend
sudo cp -rf build/* /var/www/movinin/backend

sudo rm -rf /var/cache/nginx
sudo systemctl restart nginx
sudo systemctl status nginx --no-pager

finish_time=$(date +%s)
elapsed_time=$((finish_time - start_time))
((sec=elapsed_time%60, elapsed_time/=60, min=elapsed_time%60, hrs=elapsed_time/60))
timestamp=$(printf "Movin' In backend deployed in %d minutes and %d seconds." $min $sec)
echo $timestamp

#$SHELL
