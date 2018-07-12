#!/bin/sh

set -e

# tell jekyll to parse things as utf-8
export LANG="en_GB.UTF-8"

cd `dirname $0`

node ../scripts/generate-faq.js > _posts/guides/2015-08-19-faq.md

jekyll build

./add_anchors.py _site/projects/try-matrix-now.html
cp css/docs_overrides.css _site/css
[ -h _site/guides/css ] ||  ln -s ../css _site/guides/
