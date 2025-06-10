FROM jenkins/jenkins:jdk21

USER root

RUN apt-get update \
    && apt-get install -y docker.io \
    && apt-get install -y docker-compose \
    && apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_19.x \
    && apt install -y nodejs

