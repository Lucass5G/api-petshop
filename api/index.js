const express = require("express");
const config = require("config");
const NotFound = require("./errors/NotFound");
const InvalidField = require("./errors/InvalidField");

const app = express();

const port = config.get("api.port");

app.use(express.json());

const router = require("./routes/fornecedores");
app.use("/api/fornecedores", router);

app.use((error, req, res, next) => {
  if (error instanceof NotFound) {
    res.status(404).send(JSON.stringify({ message: error.message }));
  }

  if (error instanceof InvalidField) {
    res.status(400);
  }

  res.send(JSON.stringify({ message: error.message, id: error.idError }));
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));
