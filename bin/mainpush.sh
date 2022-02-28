#!/bin/sh
cd /Users/katsuki/WorkSpace/TypeScript/gh-actions-test
rm -rf dist
npm run prepare && git add . && git commit -m 'main push' && git push origin main