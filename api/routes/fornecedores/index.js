const router = require("express").Router();
const TableSupplier = require("./TableSupplier");
const Fornecedor = require("./Fornecedor");

router.get("/", async (req, res) => {
  const result = await TableSupplier.listAll();
  res.send(JSON.stringify(result));
});

router.post("/", async (req, res) => {
  try {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.create();
    res.send(JSON.stringify(fornecedor));
  } catch (error) {
    res.send(JSON.stringify({ message: error.message }));
  }
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

router.put("/:idFornecedor", async (req, res) => {
  try {
    const idFornecedor = req.params.idFornecedor;
    const dadosRecebidos = req.body;
    const data = Object.assign({}, dadosRecebidos, { id: idFornecedor });
    const fornecedor = new Fornecedor(data);
    await fornecedor.update();
    res.end();
  } catch (error) {
    res.send(JSON.stringify({ message: error.message }));
  }
});

router.delete("/:idFornecedor", async (req, res) => {
  try {
    const idFornecedor = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: idFornecedor });

    await fornecedor.load();
    await fornecedor.delete();
    res.end();
  } catch (error) {
    res.send(JSON.stringify({ message: error.message }));
  }
});

module.exports = router;
