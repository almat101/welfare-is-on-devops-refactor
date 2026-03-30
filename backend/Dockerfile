FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean install -DskipTests

FROM eclipse-temurin:21-jre-alpine-3.23 AS runtime

RUN apk update && apk upgrade 

WORKDIR /app

COPY --from=build /app/target/hug-0.0.1-SNAPSHOT.jar /app/

RUN chown -R nobody:nobody /app

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
	CMD wget --spider -q http://localhost:8088/api/v1/health || exit 1

USER nobody

CMD ["java", "-jar", "/app/hug-0.0.1-SNAPSHOT.jar"]
