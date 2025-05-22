# Use Java image
FROM openjdk:21-jdk-slim


# Set working directory
WORKDIR /app

# Copy built JAR
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
