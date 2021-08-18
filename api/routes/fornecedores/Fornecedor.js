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
    this.validate();
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

  async update() {
    await TableSupplier.pickForId(this.id);
    const campos = ["empresa", "email", "categoria"];
    const dataForUpdate = {};

    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor === "string" && valor.length > 0) {
        dataForUpdate[campo] = valor;
      }
    });

    //retorna uma lista com o nome das chaves que o objeto possui
    if (Object.keys(dataForUpdate).length === 0) {
      throw new Error("Não foram fornecidos dados para atualizar!");
    }

    await TableSupplier.update(this.id, dataForUpdate);
  }

  async delete() {
    return TableSupplier.delete(this.id);
  }

  validate() {
    const campos = ["empresa", "email", "categoria"];

    campos.forEach((campo) => {
      const valor = this[campo];

      if (typeof valor !== "string" || valor.length === 0) {
        throw new Error(`O campo ${campo} está inválido`);
      }
    });
  }
}

module.exports = Fornecedor;
