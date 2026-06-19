// selezione degli elementi relativi agli appelli
const examsStatus = document.querySelector("#exams-status");
const examsList = document.querySelector("#exams-list");

//selezione relativa alla parte del form
const examForm = document.querySelector("#exam-form");
const formMessage = document.querySelector("#form-message");
const courseInput = document.querySelector("#course");
const teacherInput = document.querySelector("#teacher");
const dateInput = document.querySelector("#date");
const classroomInput = document.querySelector("#classroom");
const typeInput = document.querySelector("#type");
const descriptionInput = document.querySelector("#description");
const loadExamsButton = document.querySelector("#load-exams-button");

// selezione degli elementi relativi alle lezioni
const lessonsStatus = document.querySelector("#lessons-status");
const lessonsList = document.querySelector("#lessons-list");

// selezione degli elementi relativi alle comunicazioni
const communicationsStatus = document.querySelector("#communications-status");
const communicationsList = document.querySelector("#communications-list");

const dark= document.querySelector("#dark-mode");

let status=false;
let status2=true;

function switchAppelli() {

  if (status2 === true) {

    loadExams();

  } else {

    nascondiAppelli();

  }
}


function nascondiAppelli()
{
  examsList.innerHTML = "";
  showExamsStatus("Appelli nascosti.");
  loadExamsButton.textContent = "Mostra Appelli";
  status2 = true;
}


function darkMode()
{
  if(status===false){
    document.body.classList.toggle("dark");
    dark.textContent="☀️";
    status=true;
  }
  else{
    document.body.classList.remove("dark");
    dark.textContent="🌑";
    status=false;
  }
}

// Funzione di visualizzazione dei messaggi 
function showFormMessage(message) {
  while (formMessage.firstChild) {
    formMessage.removeChild(formMessage.firstChild);
  }

  const text = document.createTextNode(message);
  formMessage.appendChild(text);
}

function showExamsStatus(message) {
  while (examsStatus.firstChild) {
    examsStatus.removeChild(examsStatus.firstChild);
  }

  const text = document.createTextNode(message);
  examsStatus.appendChild(text);
}


function showLessonsStatus(message) {
  while (lessonsStatus.firstChild) {
    lessonsStatus.removeChild(lessonsStatus.firstChild);
  }

  const text = document.createTextNode(message);
  lessonsStatus.appendChild(text);
}


function showCommunicationsStatus(message) {
  while (communicationsStatus.firstChild) {
    communicationsStatus.removeChild(communicationsStatus.firstChild);
  }
  const text = document.createTextNode(message);
  communicationsStatus.appendChild(text);
}


// invio del form se attivato da eventlistener

async function handleExamSubmit(event) {
    event.preventDefault();                          //non fa ricaricare la pagina al form
    const newExam = {
    course: courseInput.value,
    teacher: teacherInput.value,
    date: dateInput.value,
    classroom: classroomInput.value,
    type: typeInput.value,
    description: descriptionInput.value
    };
    if (!newExam.course ||!newExam.teacher ||!newExam.date ||!newExam.classroom ||!newExam.type)
        {
         showFormMessage("Compila tutti i campi obbligatori.");
         return;
        }
    try {
        showFormMessage("Salvataggio appello in corso...");

        const response = await fetch("/api/exams", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newExam)
        });

        const result = await response.json();

        if (!response.ok) {
        showFormMessage(result.error);
        return;
        }

        showFormMessage(result.message);
        examForm.reset();
        loadExams();
    } catch (error) {
        showFormMessage("Errore durante il salvataggio dell'appello.");
        console.error(error);
    }
}


function renderExams(exams) {
  examsList.innerHTML = "";

  if (exams.length === 0) {
    showExamsStatus("Nessun appello disponibile.");
    return;
  }

  showExamsStatus("Appelli caricati correttamente.");
  loadExamsButton.textContent="nascondi appelli";
  examsList.innerHTML = `
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Corso</th>
            <th>Docente</th>
            <th>Data</th>
            <th>Aula</th>
            <th>Tipologia</th>
            <th>Descrizione</th>
          </tr>
        </thead>
        <tbody>
          ${exams.map((exam) => `
            <tr>
              <td>${exam.course}</td>
              <td>${exam.teacher}</td>
              <td>${exam.date}</td>
              <td>${exam.classroom}</td>
              <td>${exam.type}</td>
              <td>${exam.description || ""}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}



function renderCommunications(communications) {
  communicationsList.innerHTML = "";

  if (communications.length === 0) {
    communicationsStatus.textContent = "Nessuna comunicazione disponibile.";
    return;
  }

  communications.sort((a, b) => new Date(b.date) - new Date(a.date));
  communicationsStatus.textContent = "Comunicazioni caricate correttamente.";

  communicationsList.innerHTML = `
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Data</th>
            <th>Categoria</th>
            <th>Contenuto</th>
          </tr>
        </thead>
        <tbody>
          ${communications.map((communication) => `
            <tr>
              <td>${communication.title}</td>
              <td>${communication.date}</td>
              <td>${communication.category}</td>
              <td>${communication.content}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}


function renderLessons(lessons) {
  lessonsList.innerHTML = "";
  if (lessons.length === 0) {
    showLessonsStatus("Nessuna lezione disponibile.");
    return;
  }
  lessonsList.innerHTML =
    `<div class="table-container">
      <table>
        <thead>
          <tr>
          <th>giorno</th>
          <th>orario</th>
          <th>docente</th>
          <th>corso</th>
          <th>aula</th>
          </tr>
        </thead>
        <tbody>
          ${lessons.map((lesson) => `
            <tr>
              <td>${lesson.day}</td>
              <td>${lesson.time}</td>
              <td>${lesson.teacher}</td>
              <td>${lesson.subject}</td>
              <td>${lesson.classroom}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

async function loadLessons() {
  try {
    showLessonsStatus("Caricamento orari...");
    const response = await fetch("/api/lessons");
    if (!response.ok) {
      throw new Error("Errore HTTP: " + response.status);
    }
    const lessons = await response.json();
    showLessonsStatus("Caricamento eseguito correttamente");
    renderLessons(lessons);
  } catch (error) {
    showLessonsStatus("Errore nel caricamento degli orari.");
    console.error(error);
  }
}

loadLessons();

async function loadCommunications() {
  try {
    showCommunicationsStatus("Caricamento comunicazioni...");
    const response = await fetch("/api/communications");
    if (!response.ok) {
      throw new Error("Errore HTTP: " + response.status);
    }
    const communications = await response.json();
    renderCommunications(communications);
  } catch (error) {
    showCommunicationsStatus("Errore nel caricamento delle comunicazioni.");
    console.error(error);
  }
}
loadCommunications();

async function loadExams() {                // utile perchè il fetch sarà asincrono 
  try {
    showExamsStatus("Caricamento appelli...");

    const response = await fetch("/api/exams");

    if (!response.ok) {                                      //response.ok è true se lo status HTTP è tra 200 e 299.
      throw new Error("Errore HTTP: " + response.status);
    }

    const exams = await response.json();
    status2=false;
    renderExams(exams);
  } catch (error) {
    showExamsStatus("Errore nel caricamento degli appelli.");
    console.error(error);
  }
}

loadExamsButton.addEventListener("click", switchAppelli);
examForm.addEventListener("submit", handleExamSubmit);
dark.addEventListener("click", darkMode);