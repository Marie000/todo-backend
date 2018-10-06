FROM node:8.11.3

WORKDIR /usr/src/docker-test

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]