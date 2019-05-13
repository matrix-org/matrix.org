# Dockerfile to construct the docker image used to construct the website
#
# (cd .buildkite/gatsby; docker build . -t matrixdotorg/matrixdotorg-gatsby)
# docker push matrixdotorg/matrixdotorg-gatsby

FROM node:10

RUN mkdir /opt/gatsby
COPY package.json /opt/gatsby
COPY package-lock.json /opt/gatsby

RUN cd /opt/gatsby && npm install

WORKDIR /workdir

ENV PATH="/opt/gatsby/node_modules/.bin:${PATH}"
# ENTRYPOINT ["gatsby"]
