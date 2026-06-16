const examsStatus = document.querySelector("#exams-status");
const examsList = document.querySelector("#exams-list");
const examForm = document.querySelector("#exam-form");
const formMessage = document.querySelector("#form-message");
const courseInput = document.querySelector("#course");
const teacherInput = document.querySelector("#teacher");
const dateInput = document.querySelector("#date");
const classroomInput = document.querySelector("#classroom");
const typeInput = document.querySelector("#type");
const descriptionInput = document.querySelector("#description");
const loadExamsButton = document.querySelector("#load-exams-button");
const lessonsStatus = document.querySelector("#lessons-status");
const lessonsList = document.querySelector("#lessons-list");

function showFormMessage(message) {
  while (formMessage.firstChild) {
    formMessage.removeChild(formMessage.firstChild);
  }

  const text = document.createTextNode(message);
  formMessage.appendChild(text);
}

async function handleExamSubmit(event) {
    event.preventDefault();                          //Blocca il comportamento predefinito del form senza far ricaricare la pagina
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


function showExamsStatus(message) {
  while (examsStatus.firstChild) {
    examsStatus.removeChild(examsStatus.firstChild);
  }

  const text = document.createTextNode(message);
  examsStatus.appendChild(text);
}

function renderExams(exams) {
  examsList.innerHTML = "";

  if (exams.length === 0) {
    showExamsStatus("Nessun appello disponibile.");
    return;
  }

  showExamsStatus("Appelli caricati correttamente.");

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
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function showLessonsStatus(message) {
  while (lessonsStatus.firstChild) {
    lessonsStatus.removeChild(lessonsStatus.firstChild);
  }

  const text = document.createTextNode(message);
  lessonsStatus.appendChild(text);
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
    renderLessons(lessons);
  } catch (error) {
    showLessonsStatus("Errore nel caricamento degli orari.");
    console.error(error);
  }
}

loadLessons();

async function loadExams() {                // utile perchè il fetch sarà asincrono 
  try {
    showExamsStatus("Caricamento appelli...");

    const response = await fetch("/api/exams");

    if (!response.ok) {                                      //response.ok è true se lo status HTTP è tra 200 e 299.
      throw new Error("Errore HTTP: " + response.status);
    }

    const exams = await response.json();

    renderExams(exams);
  } catch (error) {
    showExamsStatus("Errore nel caricamento degli appelli.");
    console.error(error);
  }
}


loadExamsButton.addEventListener("click", loadExams);
examForm.addEventListener("submit", handleExamSubmit);