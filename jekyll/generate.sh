#!/bin/sh

set -e

# tell jekyll to parse things as utf-8
export LANG="en_GB.UTF-8"

cd `dirname $0`

jekyll build

cp css/docs_overrides.css _site/css
#[ -h _site/guides/css ] ||  ln -s ../css _site/guides/
