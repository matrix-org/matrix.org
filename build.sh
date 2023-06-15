# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "main" ]; then
  # build production using base_url from the site config.toml
  #zola build
  zola build --base-url $CF_PAGES_URL
elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
  # build staging using CF_STAGING_URL env
  zola build --base-url $CF_STAGING_URL
else
  # build using the default cf pages env url
  zola build --base-url $CF_PAGES_URL
fi
