#!/bin/sh
rm dist -rf
mkdir lib
jsbuild build/full.cfg -v -o lib -j jsts.min.js
jsbuild build/full.cfg -u -v -o lib -j jsts.js
rm dist -rf
mkdir dist
tar -zcvf dist/jsts-0.17.0.tar.gz src lib examples src license.txt authors.txt ChangeLog README.md
zip -r -9 dist/jsts-0.17.0.zip src lib examples src license.txt authors.txt ChangeLog README.md

