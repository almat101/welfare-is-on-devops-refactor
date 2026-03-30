# Scansione dell'immagine frontend con Trivy

Questa guida mostra come eseguire una scansione di sicurezza su un'immagine Docker frontend usando Trivy, come interpretare i risultati, risolvere le vulnerabilità e migliorare la sicurezza della pipeline.

---

## Flusso consigliato: build → scan → fix → riscan

1. **Build dell'immagine**
  ```sh
  docker build -t angular-frontend .
  ```
2. **Scansione con Trivy**
  ```sh
  trivy image angular-frontend
  ```
3. **Analisi dei risultati e fix**
  - Aggiorna i pacchetti vulnerabili (es: `apk upgrade` per Alpine)
  - Ricostruisci l'immagine
4. **Riscansione**
  ```sh
  trivy image angular-frontend
  ```

---

## Comandi utili Trivy

- Scansione base:
  ```sh
  trivy image angular-frontend
  ```
- Mostra solo vulnerabilità HIGH e CRITICAL:
  ```sh
  trivy image --severity HIGH,CRITICAL angular-frontend
  ```
- Escludi directory/file dalla scansione (es: chiave privata generata da openssl):
  ```sh
  trivy image --skip-files /etc/nginx/certs/welfare.key angular-frontend

  ```
- Esporta risultati in JSON:
  ```sh
  trivy image --format json --output report.json angular-frontend
  ```
- Esporta in formato HTML:
```sh
  trivy image --format template --template "@contrib/html.tpl" --output report.html angular-frontend
```
---

## Esempio: risoluzione vulnerabilità OS Alpine

La scansione ha mostrato vulnerabilità nei pacchetti di sistema:

```sh
trivy image angular-frontend
```

Output:

```
┌──────────────────────────────┬────────┬─────────────────┬─────────┐
│            Target            │  Type  │ Vulnerabilities │ Secrets │
├──────────────────────────────┼────────┼─────────────────┼─────────┤
│ angular-frontend (alpine)    │ alpine │        7        │    -    │
└──────────────────────────────┴────────┴─────────────────┴─────────┘
```

Per risolvere:

```dockerfile
RUN apk update && apk upgrade && apk add --no-cache curl openssl vim sudo net-tools
```

Ricostruisci e riscansiona l'immagine:

```sh
docker build -t angular-frontend .
trivy image angular-frontend
```
Output atteso:
```txt
┌───────────────────────────┬────────┬─────────────────┬─────────┐
│          Target           │  Type  │ Vulnerabilities │ Secrets │
├───────────────────────────┼────────┼─────────────────┼─────────┤
│ angular-2 (alpine 3.23.3) │ alpine │        0        │    -    │
└───────────────────────────┴────────┴─────────────────┴─────────┘
```

---

## Gestione dei certificati: sviluppo vs produzione

**Sviluppo/Testing:**
- Puoi generare e includere certificati self-signed direttamente nell'immagine (come nel Dockerfile di esempio).
- È accettabile che Trivy segnali la presenza di una chiave privata, se l'immagine è solo per uso locale.

**Produzione:**
- **Non** includere mai certificati o chiavi private nell'immagine!
- Monta i certificati tramite volume Docker o usa un secret manager.
- Esempio (docker-compose):
  ```yaml
  volumes:
    - ./certs:/etc/nginx/certs:ro
  ```
- In questo modo, la scansione Trivy non troverà segreti sensibili nell'immagine.

---

## Note aggiuntive

- Puoi personalizzare la scansione con molte altre opzioni, vedi la [documentazione ufficiale di Trivy](https://aquasecurity.github.io/trivy/latest/docs/).
- Se usi CI/CD, puoi far fallire la pipeline se vengono trovate vulnerabilità di livello alto:
  ```sh
  trivy image --exit-code 1 --severity HIGH,CRITICAL angular-frontend
  ```

---

> **Nota:** In questa immagine la chiave privata viene generata e inclusa solo per test/sviluppo locale. In produzione questa pratica è da evitare: i certificati vanno sempre forniti tramite volume o secret manager e mai inseriti nell'immagine.

Esempio di scansione pulita ( ignorando la chiave):
```txt
➜  ANGULAR git:(main) ✗   trivy image --skip-files //etc/nginx/certs/welfare.key angular-2
2026-03-30T17:38:58+02:00       INFO    [vuln] Vulnerability scanning is enabled
2026-03-30T17:38:58+02:00       INFO    [secret] Secret scanning is enabled
2026-03-30T17:38:58+02:00       INFO    [secret] If your scanning is slow, please try '--scanners vuln' to disable secret scanning
2026-03-30T17:38:58+02:00       INFO    [secret] Please see https://trivy.dev/docs/v0.69/guide/scanner/secret#recommendation for faster secret detection
2026-03-30T17:38:59+02:00       INFO    Detected OS     family="alpine" version="3.23.3"
2026-03-30T17:38:59+02:00       INFO    [alpine] Detecting vulnerabilities...   os_version="3.23" repository="3.23" pkg_num=79
2026-03-30T17:38:59+02:00       INFO    Number of language-specific files       num=0

Report Summary

┌───────────────────────────┬────────┬─────────────────┬─────────┐
│          Target           │  Type  │ Vulnerabilities │ Secrets │
├───────────────────────────┼────────┼─────────────────┼─────────┤
│ angular-2 (alpine 3.23.3) │ alpine │        0        │    -    │
└───────────────────────────┴────────┴─────────────────┴─────────┘
Legend:
- '-': Not scanned
- '0': Clean (no security findings detected)
```
