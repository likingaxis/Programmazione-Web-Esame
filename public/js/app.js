const examsStatus = document.querySelector("#exams-status");
const examsList = document.querySelector("#exams-list");
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


