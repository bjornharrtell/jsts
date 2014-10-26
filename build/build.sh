#!/bin/sh
jsbuild full.cfg -v -o ../lib -j jsts.js
tar -cvf jsts-0.15.0.tar ../src ../doc ../lib ../examples ../src ../license.txt ../authors.txt ../ChangeLog ../README.md
rm jsts-0.15.0.tar.gz
gzip -9 jsts-0.15.0.tar
mkdir tmp
cd tmp
tar xvfz ../jsts-0.15.0.tar.gz
rm ../jsts-0.15.0.zip
zip -r -9 ../jsts-0.15.0.zip *
cd ..
rm tmp -rf
