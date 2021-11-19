#!/bin/sh

set -e

# tell jekyll to parse things as utf-8
export LANG="en_GB.UTF-8"

cd `dirname $0`

jekyll build
