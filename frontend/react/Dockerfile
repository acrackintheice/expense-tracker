FROM node AS kappa

RUN mkdir /usr/src/react

WORKDIR /usr/src/react

COPY package.json /usr/src/react/package.json

RUN npm install

COPY . /usr/src/react

EXPOSE 8080