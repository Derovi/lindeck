#!/bin/sh
# This is a comment!
cd ..
cd lindeck-frontend/
sudo npm run build
cd ..
cd lindeck-cordova/
rm -r www
cp -R ../lindeck-frontend/build ./
mv build www
sudo cordova run android