# Imagem Ubuntu
FROM ubuntu:latest AS build 

ARG DATABASE_URL
ARG DATABASE_NAME
ARG CLIENT_USER
ARG CLIENT_KEY

ENV DATABASE_URL=${DATABASE_URL}
ENV DATABASE_NAME=${DATABASE_NAME}
ENV CLIENT_USER=${CLIENT_USER}
ENV CLIENT_KEY=${CLIENT_KEY}

# Atualização de pacotes
RUN apt-get update
# Instalação do OpenJDK
RUN apt-get install openjdk-17-jdk -y
# Copia arquivos a partir da raíz do projeto para a raiz do contâiner
COPY . .

# Instalação do Maven
RUN apt-get install maven -y
# Gera .jar na pasta /target
RUN mvn clean install

FROM openjdk:17-jdk-slim
EXPOSE 8080

COPY --from=build /target/dgusto-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]