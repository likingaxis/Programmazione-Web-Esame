# Progetto PW — Portale esami Informatica Tor Vergata

## Idea generale

Il progetto consiste in una web app a singola pagina pensata per studenti già iscritti al corso di Informatica.
L’obiettivo è simulare un piccolo portale dove è possibile consultare gli esami caricati dai professori.

Il sito permette di visualizzare una lista di esami e consultarne le informazioni principali.

## Obiettivo del progetto

L’obiettivo è realizzare un sito semplice ma completo, utile per ripassare gli argomenti principali di Programmazione Web:

* struttura HTML della pagina;
* stile e layout con CSS;
* interazione con JavaScript;
* gestione dinamica dei dati;
* lettura dei dati da file JSON.

## Funzionalità principali

La web app dovrà permettere di:

* visualizzare gli esami disponibili;
* mostrare informazioni come nome esame, professore, data, aula e descrizione;
* mostrare gli esami in una tabella facile da consultare;
* aggiornare dinamicamente la pagina tramite JavaScript;
* leggere i dati da un file JSON.
* caricare gli esami dal backend tramite chiamate HTTP;
* aggiungere un nuovo appello tramite un form nell’area docente simulata;
* ricevere messaggi di errore in caso di dati non validi;
* visualizzare stati di caricamento, errore, successo e lista vuota.

## Scelte progettuali

Il progetto sarà sviluppato come applicazione front-end a singola pagina.
Non è previsto un sistema di login, in modo da mantenere il progetto gestibile e concentrarsi sugli argomenti principali del corso.

I dati degli esami saranno salvati in file JSON lato server. Il frontend non accederà direttamente ai file JSON, ma comunicherà con il backend Express tramite chiamate HTTP fetch verso rotte REST.


## Progettazione lato server

Il progetto prevede un backend realizzato con Node.js ed Express.
Il server avrà il compito di servire i file statici del frontend e di esporre alcune rotte API in formato JSON.

La risorsa principale del progetto sarà rappresentata dagli appelli d’esame. Le rotte principali saranno:

* `GET /api/exams` — restituisce la lista degli appelli disponibili;
* `GET /api/exams/:id` — restituisce il dettaglio di un singolo appello;
* `POST /api/exams` — permette di aggiungere un nuovo appello tramite l’area docente simulata.

I dati saranno salvati in file JSON lato server, ad esempio nella cartella `data/`. Il frontend non leggerà direttamente questi file, ma userà `fetch` con `async/await` per comunicare con il backend.

Il server userà il middleware `express.json()` per leggere i dati inviati dal frontend in formato JSON e `express.static()` per servire i file HTML, CSS e JavaScript presenti nella cartella `public/`.

Nel caso di dati mancanti o non validi durante la creazione di un appello, il backend restituirà una risposta con codice `400 Bad Request`.
Se viene richiesto un appello inesistente, il backend restituirà `404 Not Found`.
In caso di errore imprevisto, il server restituirà `500 Internal Server Error`.

Questa struttura permette di mostrare il funzionamento del modello client-server, delle API REST, dei metodi HTTP, delle risposte JSON e degli status code.


## Possibili funzionalità extra

Se il tempo lo permette, si possono aggiungere alcune funzionalità extra:

* filtrare gli esami per corso, anno o tipologia;
* ordinamento degli esami per data;
* evidenziazione degli esami più vicini;
* sezione “preferiti”;
* messaggio quando nessun esame corrisponde alla ricerca;


## Tecnologie utilizzate

* HTML
* CSS
* JavaScript
* Fetch API
* Node.js
* Express
* JSON
* Git e GitHub

## Mockup minimale

Header con titolo e navigazione.
Sezione Appelli con pulsante “Mostra appelli”, messaggio di stato e tabella generata dinamicamente.
Sezione Orari con tabella degli insegnamenti.
Sezione Comunicazioni con tabella degli avvisi.
Sezione Area docente con form per inserire un nuovo appello.

## Scenari di test

1. Caricamento appelli
   - Azione: cliccare su “Mostra appelli”.
   - Risultato atteso: viene mostrata una tabella con gli appelli disponibili.

2. Inserimento appello valido
   - Azione: compilare tutti i campi obbligatori del form docente e inviare.
   - Risultato atteso: il server risponde con 201 e il nuovo appello viene salvato.

3. Inserimento appello non valido
   - Azione: inviare il form con campi obbligatori mancanti.
   - Risultato atteso: viene mostrato un messaggio di errore e il server restituisce 400.

4. Appello inesistente
   - Azione: richiedere /api/exams/999.
   - Risultato atteso: il server restituisce 404 con messaggio “Appello non trovato”.

5. Errore di caricamento
   - Azione: simulare server non disponibile o rotta errata.
   - Risultato atteso: il frontend mostra un messaggio di errore.

## Obiettivo finale

Alla fine del progetto voglio ottenere una web app funzionante, ordinata e presentabile all’esame, che dimostri l’uso pratico degli argomenti principali di Programmazione Web.