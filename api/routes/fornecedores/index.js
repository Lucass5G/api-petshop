const router = require("express").Router();
const TableProvider = require("./TableProvider");
const Fornecedor = require("./Fornecedor");

router.get("/", async (req, res) => {
  const result = await TableProvider.listAll();
  res.send(JSON.stringify(result));
});

router.post("/", (req, res) => {
  const dadosRecebidos = req.body;
  const fornecedor = new Fornecedor(dadosRecebidos);
});

module.exports = router;
