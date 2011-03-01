#!/usr/bin/env python
import os
import sys
from subprocess import call

rootdir = sys.argv[1]

for dirpath, dirnames, filenames in os.walk(rootdir):
    for filename in filenames:
        path = os.path.join(dirpath, filename);
        call(['js','jslintrun.js',path])
