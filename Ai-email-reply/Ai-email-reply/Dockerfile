FROM openjdk:17
ARG jar_file=target/*.jar
COPY target/*.jar ai-email-reply-ext.jar
ENTRYPOINT ["java", "-jar", "ai-email-reply-ext.jar"]
EXPOSE 7070

