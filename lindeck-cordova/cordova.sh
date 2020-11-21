#!/bin/sh
# This is a comment!

export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=${PATH}:${JAVA_HOME}/bin

export ANDROID_HOME=~/Android/Sdk
export ANDROID_SDK_ROOT=~/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-too


cd ..
cd lindeck-frontend/
sudo npm run build
cd ..
cd lindeck-cordova/
rm -r www
cp -R ../lindeck-frontend/build ./
sudo mv build www


sudo cordova run android