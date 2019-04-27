# Dockerfile to construct the docker image used to construct the website
#
# docker build .buildkite -f .buildkite/Dockerfile -t matrixdotorg/matrixdotorg-build
# docker push matrixdotorg/matrixdotorg-build

# 2.7 because the jekyll rst plugin expects it
FROM python:2.7-stretch

# install some debs
RUN apt-get -q update && apt-get -q install -y \
    jekyll \
    locales

# we need a working UTF-8 locale
RUN echo "en_GB.UTF-8 UTF-8" >> /etc/locale.gen
RUN locale-gen
RUN update-locale LANG=en_GB.UTF-8

# install the RbST gem
RUN gem install RbST

# prep our virtualenv
RUN virtualenv /env
RUN /env/bin/pip install docutils pygments
