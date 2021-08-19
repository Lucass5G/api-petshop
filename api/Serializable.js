class Serializable {
  json(dados) {
    return JSON.stringify(dados);
  }

  serialize(dados) {
    if (this.contentType === "application/json") {
      return this.json(dados);
    }

    throw new Error(
      'Não é possível serializar o tipo de conteúdo "' + this.contentType + '".'
    );
  }
}

class SupplierSerializable extends Serializable {
  constructor(contentType) {
    super();
    this.contentType = contentType;
  }
}

module.exports = {
  Serializable: Serializable,
  SupplierSerializable: SupplierSerializable,
  formatAccept: ["application/json"],
};
