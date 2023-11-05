#!/bin/bash

start_time=$(date +%s)
echo "Deploying Movin' In API..."

cd /opt/movinin
git pull
chmod +x -R /opt/movinin/__scripts

cd /opt/movinin/api

npm install --omit=dev

sudo systemctl restart movinin
sudo systemctl status movinin --no-pager

finish_time=$(date +%s)
elapsed_time=$((finish_time - start_time))
((sec=elapsed_time%60, elapsed_time/=60, min=elapsed_time%60, hrs=elapsed_time/60))
timestamp=$(printf "Movin' In API deployed in %d minutes and %d seconds." $min $sec)
echo $timestamp

#$SHEL
