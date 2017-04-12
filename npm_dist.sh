#!/bin/bash
#rm -rf ./dist
#mkdir ./dist
mkdir ./dist/dist
mv ./dist/jsts.* ./dist/dist
cp -r ./src/java ./dist/java
cp -r ./src/org ./dist/org
cp ./src/index.js ./dist/index.js
cp ./src/inherits.js ./dist/inherits.js
cp ./src/hasInterface.js ./dist/hasInterface.js
cp ./src/extend.js ./dist/extend.js
cp ./src/Map.js ./dist/Map.js
cp ./package.json ./dist/package.json
cp ./README.md ./dist/README.md