FROM node:5

MAINTAINER Telo <joaotelo.nh@hotmail.com>

COPY . /src

WORKDIR /src
RUN npm install

CMD ["npm", "start"]