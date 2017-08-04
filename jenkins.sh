#!/bin/sh

set -ex

virtualenv env
. env/bin/activate
pip install docutils
pip install pygments

# update the generated bits of the site
./scripts/update_docs.sh

# build it all into a tarball
tar -czf content.tar.gz content
