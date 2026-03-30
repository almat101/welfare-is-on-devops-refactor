# Lista errori affrontati

Lista errori affrontati durante il recupero di questo vecchio progetto.

## Errore env
**causa**
Banalmente durante la rimozione delle variabili hardcodate nel codice avevo lasciato le variabili di ambinete di postgres diverse da quelle usati dal backend java:

```env
#postgres
POSTGRES_USER=your_username
POSTGRES_PASSWORD=_your_password
PGDATA=/var/lib/postgresql/data
POSTGRES_DB=leonardo_hug_storage

#backend java
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-sql-leo:5432/leonardo_hug_storage
SPRING_DATASOURCE_USERNAME=username
SPRING_DATASOURCE_PASSWORD=password
```

**errore**
Questo ha causato un errore di connessione tra Spring Boot e il database.


**soluzione**
Queste variabili devono essere uguali per permettere a Java di connettersi a Postgres.

**errore nei log di spring**
```txt
2026-03-27T14:29:44.603Z  WARN 1 --- [           main] o.h.e.j.e.i.JdbcEnvironmentInitiator     : HHH000342: Could not obtain connection to query metadata
java.lang.NullPointerException: Cannot invoke "org.hibernate.engine.jdbc.spi.SqlExceptionHelper.convert(java.sql.SQLException, String)" because the return value of "org.hibernate.resource.tr..."
```

**errore corrispondente nei log di postgres:**
```txt
2026-03-27 14:29:43.596 UTC [75] FATAL:  password authentication failed for user "username"
2026-03-27 14:29:43.596 UTC [75] DETAIL:  Role "username" does not exist.
  Connection matched file "/var/lib/postgresql/data/pg_hba.conf" line 128: "host all all all scram-sha-256"
```


# Errori percorsi relativi tra build e runtime

**causa**
Durante la migrazione verso un dockerfile multistage ho lasciato i percorsi relativi per effettuare il COPY.

**errore**:
Tra un stage e un altro bisogna usare i percorsi assoluti e non relativi ( ../target).

**errore nei log**:
```txt
 => ERROR [backend runtime 3/4] COPY --from=build ../target/hug-0.0.1-SNAPSHOT.jar /app/  0.0s
 => ERROR [backend runtime 4/4] COPY --from=build ../src/main/resources/leonardo-7abf7-f  0.0s
------
 > [backend runtime 3/4] COPY --from=build ../target/hug-0.0.1-SNAPSHOT.jar /app/:
------
------
 > [backend runtime 4/4] COPY --from=build ../src/main/resources/leonardo-7abf7-firebase-adminsdk-rtfdb-c22e0f1580.json /src/main/resources/leonardo-7abf7-firebase-adminsdk-rtfdb-c22e0f1580.json:
------
[+] up 0/2
 ⠙ Image welfare-is-on-backend  Building                                                   0.8s
 ⠙ Image welfare-is-on-frontend Building                                                   0.8s
Dockerfile:18

--------------------

  16 |     # COPY --from=build /app/src/main/resources/leonardo-7abf7-firebase-adminsdk-rtfdb-c22e0f1580.json /app/src/main/resources/leonardo-7abf7-firebase-adminsdk-rtfdb-c22e0f1580.json

  17 |

  18 | >>> COPY --from=build ../target/hug-0.0.1-SNAPSHOT.jar /app/

  19 |     COPY --from=build ../src/main/resources/leonardo-7abf7-firebase-adminsdk-rtfdb-c22e0f1580.json /src/main/resources/leonardo-7abf7-firebase-adminsdk-rtfdb-c22e0f1580.json
```

**soluzione**
Ho sostituito i comandi COPY così:
```dockerfile
COPY --from=build /app/target/hug-0.0.1-SNAPSHOT.jar /app/
COPY --from=build /app/src/main/resources/leonardo-7abf7-firebase-adminsdk-rtfdb-c22e0f1580.json /app/src/main/resources/leonardo-7abf7-firebase-adminsdk-rtfdb-c22e0f1580.json


```

**Motivo**
I percorsi devono essere assoluti e riferiti alla WORKDIR dello stage di origine (/app).


# errore ENC VS ENV

**causa**
Nel file applicaton-dev.yml ho cambiato tutti valori hardcodati usando valori provenienti dall ENV, ma ho sbagliato in un caso ho usato  valori ENC che pero' non erano stati criptati precedentemente.

**errore nel file appliction-dev.yml**
Cos'è application-dev.yml?

`application-dev.yml` è un file di configurazione usato nei progetti Java Spring Boot per definire variabili, proprietà e parametri specifici per l'ambiente di sviluppo ("dev").
Permette di separare la configurazione di sviluppo da quella di produzione, test, ecc. e di gestire facilmente variabili d'ambiente, connessioni a database, credenziali, porte, ecc.
Spring Boot carica automaticamente questo file quando viene attivato il profilo `dev` (es. tramite `--spring.profiles.active=dev`).

per la mail ho usato:
```yml
  mail:
    host: mail-dev
    port: 1025
    username: ENC(${POSTGRES_USER})
    password: ENC(${POSTGRES_PASSWORD})
```

**errore nei log**

```txt
spring-boot-app   | ***************************
spring-boot-app   | APPLICATION FAILED TO START
spring-boot-app   | ***************************
spring-boot-app   |
spring-boot-app   | Description:
spring-boot-app   |
spring-boot-app   | Failed to bind properties under 'spring.mail.password' to java.lang.String:
spring-boot-app   |
spring-boot-app   |     Reason: org.springframework.boot.context.properties.bind.BindException: Failed to bind properties under 'spring.mail.password' to java.lang.String
spring-boot-app   |
spring-boot-app   | Action:
spring-boot-app   |
spring-boot-app   | Update your application's configuration
```

**soluzione**
POSTGRES_USER e POSTGRES_PASSWORD sono variabili d'ambiente e vanno inseriti direttamente cosi per far si che java li usi.

```yml
 mail:
    host: mail-dev
    port: 1025
    username: ${POSTGRES_USER}
    password: ${POSTGRES_PASSWORD}
```

**motivo**
Se non hai cifrato i valori di POSTGRES_USER e POSTGRES_PASSWORD, ma sono semplici stringhe nel .env, allora Spring Boot (con Jasypt o simili) non riuscirà a decriptarli e darà errore di binding.

Così Spring Boot userà direttamente i valori delle variabili d’ambiente.

**In sintesi**

Usa ENC(...) solo se i valori sono cifrati e hai la libreria di decriptazione attiva.

Altrimenti, lascia solo ${POSTGRES_USER} e ${POSTGRES_PASSWORD}.

**esempio cifratura**
Per usare i valori cifrati bisogna prima cifrarli con  Jasypt CLI:
La cifratura va fatta prima, usando la CLI di Jasypt (o un tool equivalente).
Tu fornisci la password di cifratura (es. MY_ENV_VAR) e il valore da cifrare (es. la password del DB).
Ottieni una stringa cifrata che inserirai nel .env o direttamente nel file di configurazione come ENC(...)

```sh
java -cp jasypt-1.9.3.jar org.jasypt.intf.cli.JasyptPBEStringEncryptionCLI \
  input="password" \
  password="MY_ENV_VAR" \
  algorithm="PBEWithMD5AndDES"
```

ENC(la_stringa_cifrata)

**la decifratura avviene a runtime:**

Quando Spring Boot parte, la tua classe JasyptConfig legge la password di cifratura da MY_ENV_VAR.
Jasypt intercetta tutte le proprietà scritte come ENC(...) e le decifra a runtime usando la password fornita.

**in sintesi:**

Cifra i valori PRIMA con la CLI (o tool equivalente).
Spring/Jasypt decifra a runtime usando la password che hai impostato (es. MY_ENV_VAR).
La classe Java viene usata automaticamente da Spring Boot.
