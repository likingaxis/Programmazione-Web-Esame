const express = require("express");
const fs = require("fs");
const path = require("path");
const examsFilePath = path.join(__dirname, "data", "exams.json");
const lessonsFilePath = path.join(__dirname, "data", "lessons.json");
const app = express();
const PORT = 3000;

// AGGIUNTA MIDDLEWERE PER PARSING JSON E SERVIRE FILE STATICI
app.use(express.json());
app.use(express.static("public"));

function readExams() {
  const data = fs.readFileSync(examsFilePath, "utf-8");
  return JSON.parse(data);
}
function writeExams(exams) {
  fs.writeFileSync(examsFilePath, JSON.stringify(exams, null, 2));  //indentazione di 2 spazi per leggibilità
}

function readLessons(){
  const data= fs.readFileSync(lessonsFilePath, "utf-8");
  return JSON.parse(data);
}

app.get("/api/lessons", (req, res) => {
  const lessons = readLessons();
  res.json(lessons);
});

app.get("/api/exams", (req, res) => {
  const exams = readExams();
  res.json(exams);
});

app.get("/api/exams/:id", (req, res) => {
  const exams = readExams();
  const id = Number(req.params.id); //id arriva come stringa quindi ho messo un casting a numero

  const exam = exams.find((item) => item.id === id);

  if (!exam) {
    return res.status(404).json({
      error: "Appello non trovato"
    });
  }

  res.json(exam);
});

app.post("/api/exams", (req, res) => {
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

  res.status(201).json({    //errore 201 serve per indicare che la risorsa è stata creata con successo
    message: "Appello creato con successo",
    exam: newExam
  });
});


app.get("/api/status", (req, res) => {
  res.json({
    message: "Server Express funzionante"
  });
});


app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});