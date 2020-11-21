#!/bin/sh
# This is a comment!

rm -r www
cp -R ../lindeck-frontend/build ./
mv build www
cordova run android