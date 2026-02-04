# Build stage using Maven to compile the jar
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage using eclipse-temurin as requested
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# Copy the compiled jar from the build stage
COPY --from=build /app/target/ai-recruiter-*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
