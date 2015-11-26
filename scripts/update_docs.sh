#!/bin/bash -eu

# Note that this file is world-readable unless someone plays some .htaccess hijinks

echo >&2 "Make sure you have run \`git submodule update --remote\` to pull in the latest changes."

SELF="${BASH_SOURCE[0]}"
if [[ "${SELF}" != /* ]]; then
  SELF="$(pwd)/${SELF}"
fi
SELF="${SELF/\/.\///}"
cd "$(dirname "$(dirname "${SELF}")")"

SITE_BASE="$(pwd)"

cd matrix-doc/scripts
INCLUDES="${SITE_BASE}/includes/from_jekyll"
python gendoc.py

./generate-http-docs.sh

./add-matrix-org-stylings.sh "${INCLUDES}"

mkdir -p "${SITE_BASE}/docs/"{api/client-server,howtos,spec}
cp gen/specification.html  "${SITE_BASE}/docs/spec/index.html"
cp gen/howtos.html "${SITE_BASE}/docs/howtos/client-server.html"
cp gen/http_apis.html "${SITE_BASE}/docs/api/client-server/index.html"
