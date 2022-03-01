#!/bin/sh
echo "==================================="
echo "==================================="
echo "WHATEVER IT IS,,, I'M RELEASEING IT"
echo "==================================="
echo "==================================="

# rm -rf dist/
# npm run prepare

echo "INPUT VERSION PLZZZZZZZZZZZ"
read tag
echo "=======You typed ${tag}==========="

git add . && git commit -m 'tmp' && git push origin main
git tag ${tag} && git push origin ${tag}

echo "DONE"