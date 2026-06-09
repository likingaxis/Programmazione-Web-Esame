const express = require("express");
const app = express();
const PORT = 3000;

// AGGIUNTA MIDDLEWERE PER PARSING JSON E SERVIRE FILE STATICI
app.use(express.json());
app.use(express.static("public"));

app.get("/api/status", (req, res) => {
  res.json({
    message: "Server Express funzionante"
  });
});


app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});