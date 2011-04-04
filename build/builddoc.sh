#!/bin/sh
java -jar ../jsdoc-toolkit/jsrun.jar ../jsdoc-toolkit/app/run.js -a -r=6 -t=../jsdoc-toolkit/templates/codeview -D="title:JSTS Topology Suite Library" -D="noGlobal:true" -d=../doc/api ../src/

