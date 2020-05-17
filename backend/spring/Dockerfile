# syntax=docker/dockerfile:experimental
FROM maven:3-jdk-11 as BUILD
WORKDIR /usr/src/app

COPY ./pom.xml ./pom.xml    
RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline -B

COPY ./src ./src
RUN --mount=type=cache,target=/root/.m2 mvn package -Dmaven.test.skip

FROM openjdk:11-jre-slim
EXPOSE 8080
COPY --from=BUILD /usr/src/app/target /opt/target
RUN mkdir /opt/one
WORKDIR /opt/target
# CMD ["/bin/bash", "-c", "find -type f -name '*.jar' | xargs java -jar -Dspring.profiles.active=dev"]