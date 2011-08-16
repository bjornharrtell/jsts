#!/bin/sh
jsbuild full.cfg -v -o ../lib -j jsts.js
tar -cvf jsts-0.9.0.tar ../src ../doc ../lib ../examples ../src ../license.txt ../authors.txt ../README.md
gzip jsts-0.9.0.tar
mkdir tmp
cd tmp
tar xvfz ../jsts-0.9.0.tar.gz
zip ../jsts-0.9.0.zip * -r
cd ..
rm tmp -rf

