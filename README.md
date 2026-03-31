## Modernizzazione DevOps welfare-is-on

Questo repository nasce dal recupero di un vecchio progetto (circa due anni fa), che sto ottimizzando e documentando in chiave DevOps moderna.

L'obiettivo è trasformare un'applicazione legacy in una soluzione moderna, sicura e facilmente manutenibile, applicando le best practice DevOps più attuali:
- Refactoring completo della pipeline di build e deploy (Docker, multistage, .env, secrets, .dockerignore)
- Rimozione di variabili hardcoded nelle immagini
- Gestione sicura delle variabili d'ambiente e dei segreti
- Automazione dei controlli di sicurezza (Trivy, gestione CVE)
- Ottimizzazione delle immagini Docker per peso, sicurezza e velocità
- Adozione e spiegazione delle best practice DevOps più rilevanti per la modernizzazione del progetto.
- Introduzione di test automatici e quality gate

Questo progetto vuole essere un esempio pratico di come modernizzare un software esistente, portandolo agli standard di sicurezza, automazione e qualità richiesti oggi in produzione.

**Diario**

- **26 marzo 2026:**
	- Primo giorno di lavoro sul refactoring DevOps.
	- Sono riuscito a far partire il vecchio progetto centralizzando tutte le variabili d'ambiente in un file `.env`, eliminando quelle hardcodate da Dockerfile e compose.
    - Il backend va compilato con maven prima di avviare il compose.
    - Anche il frontend va compilato e poi copiato nella cartella servita da nginx prima di avviare il compose.
    
- **27 marzo 2026:**	
	- Secondo giorno ho impostato il Dockerfile usando una build multistage per mantenere l’immagine finale minima.
	- Nel primo stage ho usato Maven ( JDK ) per buildare il codice Java e generare il file .jar eseguibile. 	
	- Nel secondo stage ho usato una versione JRE Alpine per eseguire il .jar.
	- Ho aggiunto un healthcheck apposito e l'uso di un utente non root per garantire sicurezza e privilegi minimi.

- **29 marzo 2026**
	- Durante una scansione con trivy del dockerfile java, ho trovato le credenziali firebase committate nel codice ( trivy config .)
	- Ho quindi rimosso il file delle credenziali Firebase dal repository per motivi di sicurezza.
	- Ho spostato il file in una cartella non tracciata da git e l'ho aggiunto al `.gitignore`.
	- Ora il file viene montato come Docker secret tramite la sezione `secrets` di `docker-compose.yml`.
	- Il backend legge il file direttamente dal path `/run/secrets/firebase-creds` (dove Docker Compose monta il secret nel container).
	- In questo modo le credenziali restano fuori dal repository, non vengono mai copiate nell'immagine e sono accessibili solo in runtime, in sola lettura e in modo sicuro.
	- Ho aggiunto il `.dockerignore`: anche se nel container finale copio solo il `.jar`, questo file velocizza la build Docker perché riduce la quantità di file inviati come build context (escludendo cartelle come `target/`, `.git/`, ecc.).
	- Risparmia spazio e banda durante la build, soprattutto su progetti grandi.
	- Riduce il rischio di includere file sensibili o inutili se in futuro cambi il Dockerfile.

- **30 marzo 2026**
	- Ho scansionato l'immagine buildata del backend java con Trivy ed ho risolto tutte le `CVE critiche` sull'OS Alpine e sulle librerie Java del progetto (file pom.xml), oltre ad alcune `CVE HIGH`.
	- **Best practice adottate ( trivy ):**
		- Ho eseguito la scansione sia sul Dockerfile che sull'immagine già buildata (`trivy image nome-immagine`) per identificare vulnerabilità a livello di sistema operativo e di dipendenze applicative.
		- Ho aggiornato tutte le dipendenze vulnerabili (sia OS che Java) e documentato ogni CVE rilevante e la relativa soluzione in `trivy.md`.
		- Ho evitato di ignorare vulnerabilità critiche/high: tutte le CVE critiche sono state risolte, e le high sono state analizzate e, dove possibile, mitigate o documentate.
		- Ho adottato la policy di non "silenziare" le vulnerabilità con ignore o suppression file, ma di risolverle alla radice (aggiornamento, override ecc.).

	- Ho creato il Dockerfile del frontend Angular utilizzando una multistage build ottimizzata, partendo da un Dockerfile Nginx esistente e migliorandolo secondo le best practice moderne.
	- Ho adottato tutte le best practice: uso di utente non-root per la sicurezza, healthcheck per la robustezza, e multistage build per ottenere un'immagine finale leggera e sicura.
	- Ho eseguito la scansione dell'immagine finale Nginx con Trivy, risolvendo tutte le vulnerabilità critiche e high rilevate sull'OS Alpine e sulle dipendenze di sistema.
	- Ho documentato il processo di build e di scansione, specificando la differenza tra ambiente di sviluppo (dove i certificati possono essere generati e inclusi per comodità) e ambiente di produzione (dove i certificati vanno sempre gestiti tramite volume o secret manager, mai inclusi nell'immagine).
	- Ho aggiunto esempi pratici di esclusione di file/directory sensibili dalla scansione Trivy e di esportazione dei risultati in vari formati (JSON/HTML) per una migliore integrazione in pipeline CI/CD.
	
	
- **Prossimi step e automazione (trivy in pipeline):**
	- In futuro potrei inserire la scansione Trivy come step automatico nella pipeline CI/CD (es. GitHub Actions, jenkins) per garantire che ogni build venga controllata prima del deploy.
	- Esempio comando da aggiungere in pipeline:
		```bash
		trivy image --exit-code 1 --severity CRITICAL,HIGH nome-immagine
		```
	- Questo comando blocca la pipeline se vengono trovate vulnerabilità critiche o high, garantendo che nessuna immagine vulnerabile venga rilasciata in produzione.
	- Continuerò a documentare ogni CVE rilevante e la relativa soluzione in `trivy.md` per mantenere traccia delle vulnerabilità gestite e delle scelte tecniche.



### Obiettivi e roadmap ottimizzazione

- [x] **Rimozione variabili hardcodate**: Ho eliminato tutte le variabili di ambiente hardcodate nei Dockerfile e nel docker-compose, centralizzandole in file `.env` non tracciati da git.
- [x] **Gestione secrets e sicurezza**: Migliorerò la gestione dei secrets e delle variabili sensibili.
- [x] **Ottimizzazione immagini Docker**: Ottimizzerò le immagini tramite build multistage e best practice per ridurre peso, aumentare sicurezza e velocità di build.
- [ ] **Documentazione delle principali scelte**: Le motivazioni e le best practice adottate saranno spiegate e tracciate nel repository.
- [x] **Pulizia e refactoring**: Riorganizzazione della struttura del progetto, rimozione di codice legacy e miglioramento della manutenibilità.
- [ ] **Testing e quality gate**: Introduzione di test automatici e strumenti di code quality.

### Best practice utilizzate per la creazione dei Dockerfile

- **Multistage build** per ridurre il peso delle immagini e velocizzare i tempi di deploy in produzione."
- **Uso utente non-root** per garantire il principio del minimo privilegio e ridurre la superficie d'attacco del container.
- Inserimento **healthcheck** per permettere all'orchestratore di monitorare lo stato dell'app e garantire l'alta affidabilità del servizio.
- Uso del **caching dei layer** di Docker( per es. copiando i file delle dipendenze pom.xml prima del codice sorgente). In questo modo, se il codice cambia ma le librerie no, il build è quasi istantaneo.
- **Logging**: Configurate le applicazioni affinché scrivano i log direttamente su standard output. Questo è fondamentale in un ambiente microservizi per permettere a strumenti come Loki o ELK di raccogliere i dati senza dover accedere ai singoli container
- (da fare) Uso del .dockerignore per evitare di includere file sensibili o inutili, migliorando la sicurezza e la pulizia dell'immagine.
- (da fare) Evitato uso del tag latest per le immagini in produzione. Utilizzo sempre versioni specifiche o l'hash del commit Git per garantire la tracciabilità e l'immutabilità dei rilasci 

## Vecchio Processo di build e avvio

Per avviare il progetto era necessario compilare manualmente sia il backend che il frontend prima di eseguire `docker-compose up`.

**Nota:**
Nelle prossime fasi questo processo verrà ottimizzato: la build manuale che ora richiede Java ( verificabile con mvn -v e java -version)  e npm ( npm -v ) installati localmente sarà automatizzata all’interno dei Dockerfile tramite immagini multistage. In questo modo non servirà più avere tool di build sul sistema e le immagini Docker saranno più leggere e sicure.


### Backend

1. Spostarsi nella cartella `backend`.
2. Compilare il progetto Java con Maven:
	```bash
	mvn clean install -DskipTests
	```
	Questo comando genera il file `hug-0.0.1-SNAPSHOT.jar` nella cartella `target/`.

	**Cos'è questo file `.jar`?**
	Il file `.jar` (Java ARchive) è un archivio eseguibile che contiene tutto il codice compilato, le dipendenze e le risorse necessarie per avviare l'applicazione backend scritta in Java (Spring Boot). In pratica, rappresenta l'applicazione pronta per essere eseguita su qualsiasi sistema che abbia una Java Virtual Machine (JVM) compatibile.
	Nel contesto di questo progetto, il file `hug-0.0.1-SNAPSHOT.jar` viene copiato all'interno del container Docker e avviato tramite il comando:
	```bash
	java -jar /opt/app/hug-0.0.1-SNAPSHOT.jar
	```

	Questo permette di eseguire il backend come servizio, gestendo API, logica di business e interazione con il database.

	**Peso del file:**
	Dopo la build, la cartella `target/` occupa circa **110 MB** (`du -sh target`), che è una dimensione normale per un fat jar Spring Boot con tutte le dipendenze incluse.
   

### Frontend (Angular)

1. Spostarsi nella cartella del frontend Angular (es. `angular/ANGULAR`).
2. Compilare il progetto Angular:
	```bash
	npm install
	npm run build --prod
	```
	I file statici compilati saranno disponibili nella cartella `dist/` o simile, da copiare poi nella cartella ( .browser ) servita da Nginx.

Solo dopo aver completato queste compilazioni è possibile avviare l’intero stack con:
```bash
docker-compose up --build
```


### Analisi container Java backend

**Immagine attuale: eclipse-temurin:21**

- Questa immagine Docker fornisce una distribuzione open source di Java 21 (LTS) mantenuta dalla Eclipse Foundation.
- È basata su Debian e include sia il JDK (Java Development Kit) che tutte le librerie di sistema necessarie.

**Cosa contiene?**
- Il JDK comprende sia il compilatore (`javac`) che il runtime (`java`).
- Permette sia di compilare codice Java che di eseguire applicazioni già compilate (come il nostro `.jar`).
- L’immagine "full" pesa circa **500-600 MB**.

**JDK vs JRE**
- **JDK (Java Development Kit):** tutto il necessario per sviluppare e compilare applicazioni Java (compilatore, debugger, strumenti di sviluppo, runtime).
- **JRE (Java Runtime Environment):** solo ciò che serve per eseguire applicazioni Java già compilate (solo runtime, niente compilatore).
- Per eseguire un file `.jar` già pronto, sarebbe sufficiente la JRE, ma molte immagini moderne distribuiscono solo JDK per semplicità.

**Ottimizzazione e sicurezza**
- L’immagine attuale non è ottimizzata: contiene strumenti di sviluppo che non servono in produzione e molte librerie di sistema.
- In produzione si preferisce una variante "slim" o "alpine" (più leggere, meno superficie d’attacco) o immagini solo JRE (se disponibili).

**Prossimo step: multistage build**
- L’obiettivo sarà ottimizzare la Dockerfile usando una build multistage:
	- Primo stage: usa un’immagine JDK per compilare il progetto.
	- Secondo stage: copia solo il `.jar` finale in un’immagine più leggera (slim, alpine o solo JRE) per l’esecuzione.
- Così si riduce il peso dell’immagine finale e si migliora la sicurezza, perché nel container di produzione non ci saranno strumenti di sviluppo.

**In sintesi:**
- Ora il backend gira su un container Java "completo" (JDK, base Debian, 500-600 MB).
- In futuro, con la multistage build, il container sarà molto più leggero e sicuro, con solo ciò che serve per eseguire il backend.


### Best practice Docker adottate (Dockerfile spring)

- **Build multistage:**
	- Ho usato uno stage di build con Maven+JDK solo per compilare il progetto Java.
	- Ho usato un secondo stage (runtime) con un'immagine molto più leggera (JRE Alpine) per eseguire solo il jar, senza tool di sviluppo.

- **WORKDIR in entrambi gli stage:**
	- Ho impostato la working directory a /app sia nello stage di build che in quello di runtime, per chiarezza e sicurezza.

- **COPY selettivo:**
	- Ho copiato prima solo pom.xml nello stage di build, poi ho eseguito `mvn dependency:go-offline -B` per scaricare tutte le dipendenze. Solo dopo ho copiato la cartella `src/` e lanciato la build (`mvn clean install`).
	- In questo modo ho sfruttato la cache di Docker: se cambio solo il codice sorgente ma non le dipendenze, Docker non riscarica tutte le librerie Maven, velocizzando molto la build.
	- Ho applicato la stessa best practice dei progetti Node.js, dove si copia prima `package.json`/`package-lock.json` e si lancia `npm install`, poi si copia il resto del codice. Così, le dipendenze vengono installate solo se cambiano i file di manifest, non a ogni build.
	- Nello stage runtime ho copiato solo il jar finale e le risorse strettamente necessarie dal build stage.

- **Healthcheck Docker:**
	- Ho usato HEALTHCHECK con wget (versione Alpine/BusyBox) per verificare la salute dell'applicazione tramite un endpoint pubblico /api/v1/health.
	- Ho usato la sintassi: `HEALTHCHECK ... CMD wget --spider -q http://localhost:8088/api/v1/health || exit 1`

- **Utente non root:**
	- Dopo aver copiato i file, ho assegnato la proprietà della directory /app all'utente e gruppo nobody (già presenti su Alpine).
	- Ho impostato USER nobody per eseguire il processo Java senza privilegi root, aumentando la sicurezza.
	- Per scegliere quale utente non-root usare, ho eseguito `cat /etc/passwd` e `cat /etc/group` all'interno del container per vedere gli utenti disponibili e ho scelto nobody, già presente e senza privilegi.

- **Permessi sicuri:**
	- Ho reso tutti i file e le directory dell'app di proprietà di nobody:nobody, evitando rischi di scrittura accidentale da root.

- **Immagine finale minimale:**
	- Ho ottenuto un'immagine runtime che contiene solo ciò che serve per eseguire il jar, riducendo dimensione e superficie d'attacco.

Esempio di Dockerfile adottato:

```dockerfile
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean install -DskipTests

FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app
COPY --from=build /app/target/hug-0.0.1-SNAPSHOT.jar /app/
RUN chown -R nobody:nobody /app
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
	CMD wget --spider -q http://localhost:8088/api/v1/health || exit 1
USER nobody
CMD ["java", "-jar", "/app/hug-0.0.1-SNAPSHOT.jar"]
```

Queste pratiche rendono la build ripetibile, sicura, facilmente manutenibile e pronta per ambienti di produzione.


## Analisi: Vecchio approccio frontend vs nuovo approccio DevOps

### Vecchio approccio (OLD_Dockerfile)
- **Base Debian**: L'immagine partiva da Debian, risultando più pesante e meno ottimizzata rispetto ad Alpine o immagini ufficiali Nginx.
- **Copia manuale dei file statici**: Era necessario copiare manualmente la cartella `browser` (contenente i file buildati del frontend) nella directory `/var/www/html`.
- **Nessuna ottimizzazione DevOps**: Mancavano multistage build, healthcheck, uso di utente non-root, gestione automatica delle vulnerabilità e delle dipendenze.
- **Processo manuale**: L'utente doveva buildare il frontend Angular separatamente e copiare i file nella posizione corretta prima di buildare l'immagine Docker.

### Nuovo approccio (moderno, DevOps-oriented)
- **Multistage build**: Utilizzo di build multistage per separare la fase di build (Node.js/Angular) dalla fase di runtime (Nginx), ottenendo immagini finali molto più leggere e sicure.
- **Immagine base ottimizzata**: Uso di `nginx:alpine` come base per il runtime, riducendo drasticamente il peso dell'immagine e migliorando la sicurezza.
- **Automazione completa**: La build del frontend Angular viene eseguita automaticamente all'interno del Dockerfile, senza passaggi manuali.
- **Copia automatica dei file statici**: I file generati dal build Angular vengono copiati direttamente nella root servita da Nginx (`/usr/share/nginx/html`), eliminando errori manuali.
**Gestione certificati migliorata**: I certificati vengono generati automaticamente solo per lo sviluppo, mentre in produzione si consiglia sempre l'uso di volumi o secret manager.

> **Nota:** Anche nel nuovo approccio, in ambiente di sviluppo viene installato OpenSSL (ad esempio con `apk add openssl` su Alpine) per generare certificati self-signed utili ai test locali. In produzione, invece, è fondamentale montare i certificati tramite volume Docker o secret manager, evitando di includerli nell’immagine per motivi di sicurezza.
- **Best practice Docker**: Uso di utente non-root, healthcheck, layer caching, `.dockerignore`, e logging su stdout/stderr per integrazione con sistemi di log centralizzati.
- **Sicurezza e compliance**: Scansione automatica delle immagini con Trivy, aggiornamento delle dipendenze vulnerabili, documentazione delle CVE e policy di non inclusione di segreti nell'immagine.
- **Pronto per CI/CD**: Il nuovo approccio è facilmente integrabile in pipeline CI/CD, garantendo build ripetibili, sicure e automatizzate.

### In sintesi
Il nuovo approccio elimina la necessità di operazioni manuali, riduce i rischi di errore umano, migliora la sicurezza e rende il processo di build e deploy del frontend completamente automatizzato e conforme alle best practice DevOps moderne. Questo consente maggiore velocità, affidabilità e tracciabilità nelle release, oltre a una migliore gestione della sicurezza e della qualità del software.
