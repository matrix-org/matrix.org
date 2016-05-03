#!/bin/bash -eux

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

rm -rf docs/api/client-server
mkdir -p docs/{api/client-server/json,howtos}
mkdir -p "docs/spec/${client_release_label}"

INCLUDES="${SITE_BASE}/includes/new"
(
cd matrix-doc/scripts
python gendoc.py -c "${client_release_label}"
./add-matrix-org-stylings.sh "${INCLUDES}" gen/*.html
)

./jekyll/generate.sh

cp matrix-doc/scripts/gen/* "docs/spec/${client_release_label}"
cp matrix-doc/scripts/gen/howtos.html docs/howtos/client-server.html

cp -r swagger-ui/dist/* docs/api/client-server/
matrix-doc/scripts/dump-swagger.py "${SITE_BASE}/docs/api/client-server/json" "${client_release_label}"
sed -e 's#<body class="swagger-section">#<body>#g' -i docs/api/client-server/index.html
./matrix-doc/scripts/add-matrix-org-stylings.sh "${INCLUDES}" docs/api/client-server/index.html
patch -p0 <scripts/swagger-ui.patch

echo "generating docs/spec/olm.html"
rst2html.py olm/docs/olm.rst > docs/spec/olm.html
