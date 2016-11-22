#!/bin/bash
#
# generate a new version of the Client-Server API specification and
# documentation.
#
# Usage: update_cs_api.sh rN.N.N
#
# where 'rN.N.N' is the release number for the c-s API. It will be used to
# check out a git tag 'client-server/rN.N.N' from the matrix-doc project
#
# It should be run offline, and the results checked into git; this is then
# pulled on the matrix.org server.

set -eu

if [[ $# -lt 1 ]]; then
    echo >&2 "Usage: update_cs_api.sh <client_release_label>"
    exit 1
fi

client_release_label="$1"

cd `dirname $0`/..

SITE_BASE="$(pwd)"
INCLUDES="${SITE_BASE}/includes/from_jekyll"

# make a clone of matrix-doc, checked out at the right version
if [[ ! -e .matrix-doc ]]; then
    git clone https://github.com/matrix-org/matrix-doc.git .matrix-doc
else
    (cd .matrix-doc; git fetch -t)
fi
(cd .matrix-doc; git checkout "tags/client-server/$client_release_label") ||
    { echo >&2 "unable to check out tag \"client-server/$client_release_label\" from matrix-doc"; exit 1; }

# generate the spec
rm -rf .matrix-doc/scripts/gen/client_server
./.matrix-doc/scripts/gendoc.py -c "${client_release_label}" -t client_server
cp -r .matrix-doc/scripts/gen/client_server "docs/spec"
./.matrix-doc/scripts/add-matrix-org-stylings.pl "${INCLUDES}" "docs/spec/client_server/${client_release_label}.html"
ln -sfT "${client_release_label}.html" "docs/spec/client_server/latest.html"

# generate the swagger doc
./.matrix-doc/scripts/dump-swagger.py "${SITE_BASE}/docs/spec/client_server/${client_release_label}.json" "${client_release_label}"
ln -sfT "${client_release_label}.json" "docs/spec/client_server/latest.json"

echo "Client-server API spec updated successfully"
