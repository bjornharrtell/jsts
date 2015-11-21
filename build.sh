#!/bin/sh
rm ./doc -rf
node ./node_modules/jsdoc/jsdoc.js -r -d ./doc ./src
rm ./lib -rf
mkdir ./lib
jsbuild ./build/full.cfg -v -o ./lib -j jsts.min.js
jsbuild ./build/full.cfg -u -v -o ./lib -j jsts.js
cp ./node_modules/javascript.util/dist/javascript.util.min.js ./lib/javascript.util.min.js
rm ./dist -rf
mkdir ./dist
tar -zcvf ./dist/jsts-0.17.0.tar.gz ./src ./lib ./doc ./examples ./src ./license.txt ./authors.txt ./ChangeLog ./README.md
zip -r -9 ./dist/jsts-0.17.0.zip ./src ./lib ./doc ./examples ./src ./license.txt ./uthors.txt ./ChangeLog ./README.md

