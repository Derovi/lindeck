FROM openjdk:8-jdk-alpine

COPY "/build/libs/*.jar" "lindeck.jar"
ENTRYPOINT ["java", "-jar", "/lindeck.jar"]

EXPOSE 8080
