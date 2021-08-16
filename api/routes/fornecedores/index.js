const router = require("express").Router();
const TableSupplier = require("./TableSupplier");
const Fornecedor = require("./Fornecedor");

router.get("/", async (req, res) => {
  const result = await TableSupplier.listAll();
  res.send(JSON.stringify(result));
});

router.post("/", async (req, res) => {
  const dadosRecebidos = req.body;
  const fornecedor = new Fornecedor(dadosRecebidos);
  await fornecedor.create();
  res.send(JSON.stringify(fornecedor));
});

router.get("/:idFornecedor", async (req, res) => {
  try {
    const idFornecedor = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: idFornecedor });
    await fornecedor.load();
    res.send(JSON.stringify(fornecedor));
  } catch (error) {
    res.send(JSON.stringify({ message: error.message }));
  }
});

module.exports = router;
