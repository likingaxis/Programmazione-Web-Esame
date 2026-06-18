const express = require("express");
const fs = require("fs");
const path = require("path");
const examsFilePath = path.join(__dirname, "data", "exams.json");
const lessonsFilePath = path.join(__dirname, "data", "lessons.json");
const communicationsFilePath = path.join(__dirname, "data", "communications.json");
const app = express();
const PORT = 3000;

// AGGIUNTA MIDDLEWERE PER PARSING JSON E SERVIRE FILE STATICI
app.use(express.json());
app.use(express.static("public"));


// esami
function readExams() {
  const data = fs.readFileSync(examsFilePath, "utf-8");
  return JSON.parse(data);
}

function writeExams(exams) {
  fs.writeFileSync(examsFilePath, JSON.stringify(exams, null, 2));  //indentazione di 2 spazi per leggibilità
}


// lezioni
function readLessons(){
    const data= fs.readFileSync(lessonsFilePath, "utf-8");
    return JSON.parse(data);
}

// comunicazioni
function readCommunications(){
    const data= fs.readFileSync(communicationsFilePath, "utf-8");
    return JSON.parse(data);
}

// endpoint api
app.get("/api/lessons", (req, res, next) => {
  try{
    const lessons = readLessons();
    res.json(lessons);
  }catch (error) {
    next(error);
  }
});

app.get("/api/communications", (req, res, next) => {
  try{
    const communications = readCommunications();
    res.json(communications);
  }catch (error) {
    next(error);
  }
});

app.get("/api/exams", (req, res, next) => {
  try{
    const exams = readExams();
    res.json(exams);
  }catch (error) {
    next(error);
  }
});

// ottenere un singolo esame in base a un id 
app.get("/api/exams/:id", (req, res, next) => {
  try{
    const exams = readExams();
    const id = Number(req.params.id); //id arriva come stringa quindi ho messo un casting a numero

    const exam = exams.find((item) => item.id === id);

    if (!exam) {
      return res.status(404).json({
        error: "Appello non trovato"
      });
  }
    res.json(exam);
  }catch (error) {
    next(error);
  }
});

// endpoint per aggiunta di un esame
app.post("/api/exams", (req, res, next) => {
  try{
    const exams = readExams();

    const {
      course,
      teacher,
      date,
      classroom,
      type,
      description
    } = req.body;

    if (!course || !teacher || !date || !classroom || !type) {
      return res.status(400).json({      //errore 400 Bad Request
        error: "Compila tutti i campi obbligatori"
      });
    }

    const newExam = {
      id: Date.now(),
      course,
      teacher,
      date,
      classroom,
      type,
      description: description || ""
    };

    exams.push(newExam);
    writeExams(exams);

    res.status(201).json({    //messaggio di successo 201 serve per indicare che la risorsa è stata creata con successo
      message: "Appello creato con successo",
      exam: newExam
    });
  }catch (error) {
    next(error);
  }
});

// verificare lo stato del server
app.get("/api/status", (req, res) => {
  res.json({
    message: "Server Express funzionante"
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Rotta non trovata"
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Errore interno del server"
  });
});


app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});