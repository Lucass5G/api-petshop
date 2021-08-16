const express = require("express");
const config = require("config");

const app = express();

const port = config.get("api.port");

app.use(express.json());

const router = require("./routes/fornecedores");
app.use("/api/fornecedores", router);

app.listen(port, () => console.log(`Express server listening on port ${port}`));
