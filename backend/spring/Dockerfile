FROM maven

RUN mkdir /usr/src/spring

WORKDIR /usr/src/spring

COPY . /usr/src/spring

RUN mvn clean package

EXPOSE 8080