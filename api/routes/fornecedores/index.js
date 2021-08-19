const router = require("express").Router();
const TableSupplier = require("./TableSupplier");
const Fornecedor = require("./Fornecedor");
const SupplierSerializable = require("../../Serializable").SupplierSerializable;

router.get("/", async (req, res) => {
  const result = await TableSupplier.listAll();
  const serializable = new SupplierSerializable(res.getHeader("Content-Type"));
  res.send(serializable.serialize(result));
});

router.post("/", async (req, res, next) => {
  try {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.create();
    const serializable = new SupplierSerializable(
      res.getHeader("Content-Type")
    );
    res.status(201).send(serializable.serialize(fornecedor));
  } catch (error) {
    next(error);
  }
});

router.get("/:idFornecedor", async (req, res, next) => {
  try {
    const idFornecedor = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: idFornecedor });
    await fornecedor.load();
    const serializable = new SupplierSerializable(
      res.getHeader("Content-Type")
    );
    res.send(serializable.serialize(fornecedor));
  } catch (error) {
    next(error);
  }
});

router.put("/:idFornecedor", async (req, res, next) => {
  try {
    const idFornecedor = req.params.idFornecedor;
    const dadosRecebidos = req.body;
    const data = Object.assign({}, dadosRecebidos, { id: idFornecedor });
    const fornecedor = new Fornecedor(data);
    await fornecedor.update();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete("/:idFornecedor", async (req, res, next) => {
  try {
    const idFornecedor = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: idFornecedor });

    await fornecedor.load();
    await fornecedor.delete();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
