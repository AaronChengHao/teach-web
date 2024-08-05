TACHE_API_PATH=/Users/chenghao/www/aaron/comiur/teach-api
cp -rf dist/* $TACHE_API_PATH/public
cd $TACHE_API_PATH
git add .
git commit -m "web build commit";
git push origin
