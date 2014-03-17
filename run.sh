#forever stop app.js
#rm ./public/img/user_icon -rf
#git pull
#npm install

#forever start  -o ./log/out.log -e  ./log/err.log  ./app.js

pm2 stop app_3001.js
pm2 start app_3001.js -i max

