# Portale Informatica Tor Vergata
Il progetto è stato realizzato per l'esame di Programmazione Web del 22/06/2026

## Descrizione
il progetto consiste in una web app con una singola pagina pensata per studenti già iscritti al corso di informatica e contiene una piccola simulazione che permette di consultare:
- appelli di esame
- orari delle lezioni
- comunicazioni per gli studenti
inoltre in una piccola area in fondo alla pagina è possibile aggiungere date per appelli di esami

il tutto senza sistema di login per facilitare l'utilizzo, in casi futuri comunque si potrebbe implementare un sistema più complesso con login e registrazioni

Il progetto è composto da una parte in frontend con HTML CSS e Javascript e da un backend con Node.js ed Express
i dati sono salvati in formato JSON lato server e vengono recuperati dal client mediante chiamate HTTP con fetch con async/await
## Installazione

npm install

## Avvio
- Avvio in modalità di sviluppo
    -  npm run dev
- Avvio senza nodemon
    - npm start

## Struttura del progetto
```scss
Programmazione-Web-Esame/
├── data/
│   ├── exams.json
│   ├── lessons.json
│   └── communications.json
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── specifiche/
│   └── progetto.md
├── server.js
├── package.json
└── README.md
```
## Funzionalità implementate
##### Frontend
- Struttura HTML semantica con tag coerenti
- CSS responsive con flexbox e media query desktop first
- tasto submit per inviare il form oltre al form effettivo
- chiamate al backend di tipo HTTP tramite fetch e async/await
- visualizzazione dei risultati in tabelle nelle rispettive sezioni aggiunte dinamicamente con Javascript
##### Backend
- Server realizzato con Node.js ed Express
- uso di middleware per gestire file JSON e servire file statici del frontend
- Rotte REST per la visualizzazione dei dati
- gestione degli errori 400, 404 e 500
## API disponibili
`GET /api/status`
- restituisce un messaggio per verificare l'attività del server
`GET /api/exams`
- restituisce la lista completa degli appelli d'esame
`GET /api/exams/:id`
- restituisce un singolo appello in base al suo id
`POST /api/exams`
- aggiunge un nuovo appello d'esame al file JSON
`GET /api/lessons`
- restituisce la lista degli orari delle lezioni
`GET /api/communications`
- restituisce la lista delle comunicazioni disponibili

## Funzionalità extra
Oltre alla gestione degli appelli d'esame, il progetto include:
- visualizzazione degli orari delle lezioni
- visualizzazione delle comunicazioni per gli studenti
- ordinamento delle comunicazioni dalla più recente alla meno recente
- salvataggio persistente dei nuovi appelli su file JSON


## Uso dell'AI
durante lo sviluppo è stato utilizzato ChatGPT e copilot su Visual Studio per velocizzare la realizzazione del progetto

- ChatGPT è stato utilizzato principalmente per chiarire concetti facilmente e per comprendere se si stavano commettendo errori e se si stava rispettando a pieno la consegna richiesta dall'insegnante, inoltre è stato utilizzato anche per fare una buona pianificazione e suddivisione dei compiti in obiettivi
- Copilot è stato usato invece per velocizzare la scrittura di codice, soprattutto la parte di gestione degli errori con molti try catch da dover inserire

Il tutto è stato scritto passo passo senza far generare tutto all'intelligenza artificiale con un click ed è stato ragionato e corretto da me

### Prompt utilizzati
Reputo sia interessante approfondire quali prompt ho utilizzato per la realizzazione del sito

#### Inizio progetto
- ho fatto leggere la consegna per avere un assistente con cui confrontarmi durante l'ideazione del progetto
```scss
devo realizzare un sito web per il mio esame di PW intanto leggi la consegna e poi ne discutiamo un pò insieme
```txt
secondo prompt dove espongo la mia idea in modo grossolano

```txt
io volevo fare un sito di tor vergata di informatica per i già iscritti, dove professori e studenti possono accedere alle informazioni più utili come comunicazioni, orari ecc..
credi sia troppo semplice come progetto da portare al mio insegnante?
```
### Planning e gestione dei tempi
- avendo poco tempo a disposizione, tendo spesso ad utilizzare chat gpt come aiuto per fare planning e suddivisione dei compiti in serate

```txt
la mia idea di lavorare al sito in diverse serate, con l'obiettivo di imparare e ripassare gli argomenti trattati(in vista anche dell'esame) proprio mentre lavoravo al progetto, suddividiamo il progetto in serate da 2 ore di lavoro fino a portarlo alla conclusione
```

prompt successivo
```txt
puoi crearmi una tabella operativa che dovrò seguire per le prossime 10 serate con te? grazie mille e leggi bene basandoti anche sul file inviato dal prof, quello è oro colato
```

### Serate fino alla conclusione del progetto
le serate si sono poi svolte con un ripasso dei concetti teorici dietro ciò che stavo facendo e scrittura di codice, ho sfruttato la tabella di marcia proposta da chat gpt per lavorare e non uscire fuori traccia richiesta dall'insegnante

### Fase finale
alla consegna del progetto ho inviato tutto a chat gpt per avere una valutazione del lavoro svolto
- ha aspramente criticato la gestione degli errori
- ho fatto dei commit finali di correzione varie

È stato infine aggiunto con render una versione hostata online del server node js

https://programmazione-web-esame.onrender.com

infine è stato aggiunto il middleware morgan per leggere i log del server