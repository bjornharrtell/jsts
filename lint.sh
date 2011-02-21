#/bin/sh
echo "Running gjslint on source tree"
gjslint --strict -r ./src
echo "Running jslint on source tree"
./jslint.py ./src

