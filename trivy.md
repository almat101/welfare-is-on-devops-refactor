# Trivy: scansione sicurezza immagini e SCA

Trivy è uno strumento open source che effettua la scansione di immagini Docker, filesystem, repository di codice e progetti per individuare vulnerabilità (CVE), segreti, configurazioni errate e dipendenze insicure (SCA - Software Composition Analysis).

## A cosa serve in breve
- Trivy analizza le dipendenze del progetto (librerie, package, ecc.) e segnala vulnerabilità note (CVE) presenti nei componenti usati.
- Permette di individuare rapidamente rischi di sicurezza dovuti a librerie di terze parti obsolete o vulnerabili.

## Esecuzione
Puo essere eseguito **manualmente** sul pc per "pulire" l'immagine prima di caricarla oppure in **pipeline** da Jenkins o GitHub Actions a ogni push. Se Trivy trova vulnerabilità "Critical", la pipeline si stoppa e il deploy fallisce. Questo impedisce di mandare codice insicuro in produzione.


### Comandi principali per effettuare la scansione dell'immagine e della configurazione

Build immagine spring e lancio scansione:
```sh 
    docker build -t spring-trivy .
    trivy image spring-trivy
```

  Analizza l'immagine Docker chiamata `spring-trivy` e riporta vulnerabilità, segreti e problemi di sicurezza.

Per mostrare solo quelle critical e high:
```sh
  trivy image --severity HIGH,CRITICAL spring-trivy
```

Scansione della configurazione ( Dockerfile):
```sh
    trivy config .
```
  Analizza la configurazione del progetto (Dockerfile nel mio caso) e segnala eventuali problemi di sicurezza, best practice non rispettate o configurazioni rischiose.

**ottimizzazioni effettuate (dopo trivy config .)**
- uso utente non root
- uso di healthcheck


## Trivy image (approfondimento)
Trivy è uno strumento di `SCA` (Software Composition Analysis) perché analizza tutte le dipendenze applicative (non solo quelle di sistema) per trovare vulnerabilità, licenze e rischi.
Trivy scompone i layer della tua immagine e confronta le versioni delle librerie (OS e Java) con un database di vulnerabilità note (`CVE - Common Vulnerabilities and Exposures`).
- Vulnerabilità (CVE): sono falle di sicurezza note in una libreria o software, catalogate con un codice (es. CVE-2024-7254). Permettono attacchi, exploit, ecc.
- Licenze: indica il tipo di licenza delle dipendenze (es. MIT, GPL, Apache). Alcune licenze possono porre vincoli legali sull’uso o la distribuzione del tuo software.
- Rischi: è un termine più ampio che include sia vulnerabilità di sicurezza sia altri problemi, come dipendenze non più mantenute, licenze incompatibili, configurazioni errate, ecc.

### Credenziali Firebase e GCP hardcodate nell'immagine

**causa**
Durante una scansione di sicurezza dell'immagine Docker buildata, utilizzando Trivy, ho trovato la chiave di servizio Firebase e le credenziali GCP hardcodate all'interno dell'immagine. Questi file sensibili erano stati copiati e lasciati nel build context e inclusi nell'immagine finale.

**errore**
La presenza di queste credenziali nell'immagine rappresentava un grave rischio di sicurezza: chiunque avesse accesso all'immagine poteva estrarre le chiavi e accedere ai servizi Google Cloud/Firebase associati.

**errore nei log**
```txt
CRITICAL: Google (gcp-service-account)
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
Google (GCP) Service-account
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 /app/src/main/resources/leonardo-7abf7-firebase-adminsdk-rtfdb-c22e0f1580.json:2 (offset: 4 bytes) (added by 'RUN /bin/sh -c chown -R nobody:nobody /a')
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   1   {
   2 [   *************************,
   3     "project_id": "leonardo-7abf7",
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


HIGH: AsymmetricPrivateKey (private-key)
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
Asymmetric Private Key
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
```

**soluzione**
Ho rimosso i file di credenziali dal repository e dal build context, li ho aggiunti al `.gitignore` e ho adottato l'uso di Docker secrets e variabili d'ambiente per gestirli in modo sicuro. Ora le credenziali vengono montate come secret nel container e lette tramite path sicuro o variabile d'ambiente, evitando che finiscano nell'immagine o nel repository.


### vulnerabilita su immagine alpine
**causa**
Durante la scansione con trivy ho scoperto le seguenti vulnerabilita sui seguenti pacchetti apk.
Avevo gia risolto un errore simile, per questo sapevo gia cosa fare.


**log di errore**
```txt
┌────────────────────────────────┬────────┬─────────────────┬─────────┐
│             Target             │  Type  │ Vulnerabilities │ Secrets │
├────────────────────────────────┼────────┼─────────────────┼─────────┤
│ spring-trivy-2 (alpine 3.23.3) │ alpine │        4        │    -    │
├────────────────────────────────┼────────┼─────────────────┼─────────┤
│ app/hug-0.0.1-SNAPSHOT.jar     │  jar   │       20        │    -    │
└────────────────────────────────┴────────┴─────────────────┴─────────┘
Legend:
- '-': Not scanned
- '0': Clean (no security findings detected)


spring-trivy-2 (alpine 3.23.3)

Total: 4 (HIGH: 3, CRITICAL: 1)

┌──────────┬────────────────┬──────────┬────────┬───────────────────┬───────────────┬─────────────────────────────────────────────────────────────┐
│ Library  │ Vulnerability  │ Severity │ Status │ Installed Version │ Fixed Version │                            Title                            │
├──────────┼────────────────┼──────────┼────────┼───────────────────┼───────────────┼─────────────────────────────────────────────────────────────┤
│ gnutls   │ CVE-2026-1584  │ HIGH     │ fixed  │ 3.8.11-r0         │ 3.8.12-r0     │ gnutls: gnutls: Remote Denial of Service via crafted        │
│          │                │          │        │                   │               │ ClientHello with invalid PSK...                             │
│          │                │          │        │                   │               │ https://avd.aquasec.com/nvd/cve-2026-1584                   │
├──────────┼────────────────┼──────────┤        ├───────────────────┼───────────────┼─────────────────────────────────────────────────────────────┤
│ libexpat │ CVE-2026-32767 │ CRITICAL │        │ 2.7.4-r0          │ 2.7.5-r0      │ SiYuan: Authorization Bypass Allows Arbitrary SQL Execution │
│          │                │          │        │                   │               │ via Search API                                              │
│          │                │          │        │                   │               │ https://avd.aquasec.com/nvd/cve-2026-32767                  │
├──────────┼────────────────┼──────────┤        ├───────────────────┼───────────────┼─────────────────────────────────────────────────────────────┤
│ libpng   │ CVE-2026-25646 │ HIGH     │        │ 1.6.54-r0         │ 1.6.55-r0     │ libpng: LIBPNG has a heap buffer overflow in                │
│          │                │          │        │                   │               │ png_set_quantize                                            │
│          │                │          │        │                   │               │ https://avd.aquasec.com/nvd/cve-2026-25646                  │
├──────────┼────────────────┤          │        ├───────────────────┼───────────────┼─────────────────────────────────────────────────────────────┤
│ zlib     │ CVE-2026-22184 │          │        │ 1.3.1-r2          │ 1.3.2-r0      │ zlib: zlib: Arbitrary code execution via buffer overflow in │
│          │                │          │        │                   │               │ untgz utility                                               │
│          │                │          │        │                   │               │ https://avd.aquasec.com/nvd/cve-2026-22184                  │
```


**soluzione**
Ho aggiornato la base dell'immagine runtime ad alpine 3.23 e aggiornato i pacchetti con:

```dockerfile
FROM eclipse-temurin:21-jre-alpine-3.23
RUN apk update && apk upgrade 
```

**risultato**
Scansione pulita con 0 vulnerabilita su alpine ( ma ancora 20 sul jar che risolveremo sotto).

```txt
Report Summary

┌────────────────────────────────┬────────┬─────────────────┬─────────┐
│             Target             │  Type  │ Vulnerabilities │ Secrets │
├────────────────────────────────┼────────┼─────────────────┼─────────┤
│ spring-trivy-4 (alpine 3.23.3) │ alpine │        0        │    -    │
├────────────────────────────────┼────────┼─────────────────┼─────────┤
│ app/hug-0.0.1-SNAPSHOT.jar     │  jar   │       20        │    -    │
└────────────────────────────────┴────────┴─────────────────┴─────────┘
Legend:
- '-': Not scanned
- '0': Clean (no security findings detected)

```




### Vulnerabilità nei jar 

Analizzando il report di Trivy, ho notato che la maggior parte delle vulnerabilità nei jar si risolve aggiornando manualmente le dipendenze nel file `pom.xml` (proprio come si fa con `package.json` in npm).

**Causa**
La prima vulnerabilità critica che ho voluto risolvere è stata la CVE-2025-24813.

**Errore nei log**
```txt
┌──────────────────────────────────────────────────┬────────────────┬──────────┬────────┬───────────────────┬──────────────────────────────────────────────┬─────────────────────────────────────────────────────────────┐
│                     Library                      │ Vulnerability  │ Severity │ Status │ Installed Version │                Fixed Version                 │                            Title                            │
├──────────────────────────────────────────────────┼────────────────┼──────────┼────────┼───────────────────┼──────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ org.apache.tomcat.embed:tomcat-embed-core        │ CVE-2025-24813 │ CRITICAL │ fixed  │ 10.1.24           │ 11.0.3, 10.1.35, 9.0.99                      │ tomcat: Potential RCE and/or information disclosure and/or  │
│ (hug-0.0.1-SNAPSHOT.jar)                         │                │          │        │                   │                                              │ information corruption with partial PUT...                  │
│                                                  │                │          │        │                   │                                              │ https://avd.aquasec.com/nvd/cve-2025-24813                  │
├──────────────────────────────────────────────────┼────────────────┤          │        ├───────────────────┼──────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ org.springframework.security:spring-security-web │ CVE-2024-38821 │          │        │ 6.3.0             │ 5.7.13, 5.8.15, 6.2.7, 6.0.13, 6.1.11, 6.3.4 │ Spring-WebFlux: Authorization Bypass of Static Resources in │
│ (hug-0.0.1-SNAPSHOT.jar)                         │                │          │        │                   │                                              │ WebFlux Applications                                        │
│                                                  │                │          │        │                   │                                              │ https://avd.aquasec.com/nvd/cve-2024-38821                  │
└──────────────────────────────────────────────────┴────────────────┴──────────┴────────┴───────────────────┴──────────────────────────────────────────────┴─────────────────────────────────────────────────────────────┘
```

**Dettagli**
Questa CVE colpisce Spring Boot solo in determinati casi:

> CVE-2025-24813 affects Spring Boot applications only if the default servlet is explicitly enabled (server.servlet.register-default-servlet=true) and configured with write permissions (readonly=false), as it is disabled by default in Spring Boot since 2020. 

Nel nostro caso, controllando i file di configurazione, non risultava nulla di pericoloso. Tuttavia, per eliminare ogni rischio, ho deciso comunque di aggiornare le dipendenze.

> To remediate this vulnerability in Spring Boot, you must upgrade to Spring Boot 3.2.13 or 3.3.9 (which include Tomcat 10.1.36), or manually set the Tomcat version dependency to 10.1.35 or higher (or 9.0.99+ / 11.0.3+).

**Soluzione**
Ho aggiornato Spring Boot alla versione 3.3.9 (che include Tomcat >= 10.1.36).

Nuovo `pom.xml`:
```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <!-- <version>3.3.0</version> --> 
  <version>3.3.9</version>
  <relativePath/> <!-- lookup parent from repository -->
</parent>
```

Dopo l'aggiornamento, Trivy non rileva più vulnerabilità critiche sulle librerie jar:

```txt
➜  backend trivy image --severity CRITICAL spring-trivy-5
┌────────────────────────────────┬────────┬─────────────────┬─────────┐
│             Target             │  Type  │ Vulnerabilities │ Secrets │
├────────────────────────────────┼────────┼─────────────────┼─────────┤
│ spring-trivy-5 (alpine 3.23.3) │ alpine │        0        │    -    │
├────────────────────────────────┼────────┼─────────────────┼─────────┤
│ app/hug-0.0.1-SNAPSHOT.jar     │  jar   │        0        │    -    │
└────────────────────────────────┴────────┴─────────────────┴─────────┘
Legend:
- '-': Not scanned
- '0': Clean (no security findings detected)
```


## Vulnerabilità HIGH

La prima vulnerabilità HIGH che ho incontrato riguarda jackson-core ([GHSA-72hv-8253-57qq](https://github.com/advisories/GHSA-72hv-8253-57qq)).

**Log di errore di Trivy:**
```txt
com.fasterxml.jackson.core:jackson-core │ GHSA-72hv-8253-57qq │ HIGH │ fixed │ 2.17.3 │ 2.18.6, 2.21.1, 3.1.0 │ jackson-core: Number Length Constraint Bypass in Async Parser Leads to Potential DoS...
```

**Soluzione**
La dipendenza `jackson-core` arriva da `spring-boot-starter-web`, che a sua volta è gestita da `spring-boot-starter-parent` (già aggiornato alla 3.3.9).

Potrei aggiornare tutto lo starter-parent all’ultima versione (3.5.13), ma in questo caso preferisco forzare solo l’aggiornamento di jackson-core aggiungendo questa dipendenza esplicita:

```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-core</artifactId>
  <version>2.18.6</version>
</dependency>
```


## Vulnerabilità HIGH

La seconda vulnerabilità HIGH riguarda `protobuf-java` ([CVE-2024-7254](https://avd.aquasec.com/nvd/cve-2024-7254)).

> CVE-2024-7254 is a high-severity stack overflow vulnerability in Google Protocol Buffers (Protobuf) that allows remote attackers to cause a denial of service (DoS) by parsing untrusted data with unbounded recursion in nested groups.  The vulnerability affects Protobuf Java Lite, Protobuf Java, Protobuf Kotlin, and Protobuf Ruby libraries when parsing nested groups as unknown fields or against map fields, leading to StackOverflow errors that crash the application. 

**Log di errore di Trivy:**
```txt
com.google.protobuf:protobuf-java (hug-0.0.1-SNAPSHOT.jar) │ CVE-2024-7254 │ HIGH │ fixed │ 3.25.3 │ 3.25.5, 4.27.5, 4.28.2 │ protobuf: StackOverflow vulnerability in Protocol Buffers
```

**Soluzione**
La dipendenza `protobuf-java` arriva (in modo transitivo) da `firebase-admin` (o altre Google API). Per risolvere, ho forzato l'aggiornamento aggiungendo questa dipendenza esplicita:

```xml
<dependency>
  <groupId>com.google.protobuf</groupId>
  <artifactId>protobuf-java</artifactId>
  <version>3.25.5</version>
</dependency>
```
