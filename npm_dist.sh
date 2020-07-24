#!/bin/bash
#rm -rf ./dist
#mkdir ./dist
mkdir ./dist/dist
mv ./dist/jsts.* ./dist/dist
find ./dist -name '*.ast' -type f -delete
cp -r ./src/java ./dist/java
cp -r ./src/org ./dist/org
cp ./src/hasInterface.js ./dist/hasInterface.js
cp ./package.json ./dist/package.json
cp ./README.md ./dist/README.md