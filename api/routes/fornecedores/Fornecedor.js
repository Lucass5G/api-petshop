const TableSupplier = require("./TableSupplier");

class Fornecedor {
  constructor({
    id,
    empresa,
    email,
    categoria,
    createdAt,
    updatedAt,
    version,
  }) {
    this.id = id;
    this.empresa = empresa;
    this.email = email;
    this.categoria = categoria;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.version = version;
  }

  async create() {
    const res = await TableSupplier.insert({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria,
    });

    (this.id = res.id),
      (this.createdAt = res.createdAt),
      (this.updatedAt = res.updatedAt),
      (this.version = res.version);
  }

  async load() {
    const supplierFound = await TableSupplier.pickForId(this.id);
    this.empresa = supplierFound.empresa;
    this.email = supplierFound.email;
    this.categoria = supplierFound.categoria;
    this.createdAt = supplierFound.createdAt;
    this.updatedAt = supplierFound.updatedAt;
    this.version = supplierFound.version;
  }
}

module.exports = Fornecedor;
