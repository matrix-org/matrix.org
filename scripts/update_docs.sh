#!/bin/bash -eu

# Note that this file is world-readable unless someone plays some .htaccess hijinks

# Optional first argument: client_release_label
# e.g. update_docs.sh r0

client_release_label="unstable"
if [[ $# == 1 ]]; then
  client_release_label="$1"
fi

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
python gendoc.py -c "${client_release_label}"
./add-matrix-org-stylings.sh "${INCLUDES}"

mkdir -p "${SITE_BASE}/docs/"{api/client-server/json,howtos,spec}
cp -r gen/*.html "${SITE_BASE}/docs/spec/"
cp gen/howtos.html "${SITE_BASE}/docs/howtos/client-server.html"

mkdir -p "${SITE_BASE}/docs/api/client-server/json"
python dump-swagger.py "${SITE_BASE}/docs/api/client-server/json" "${client_release_label}"
