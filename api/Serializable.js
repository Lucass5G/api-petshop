class Serializable {
  json(dados) {
    return JSON.stringify(dados);
  }

  serialize(dados) {
    if (this.contentType === "application/json") {
      return this.json(this.filter(dados));
    }

    throw new Error(
      'Não é possível serializar o tipo de conteúdo "' + this.contentType + '".'
    );
  }

  filterObject(dados) {
    const newObject = {};
    const publicFields = ["id", "empresa", "categoria"];

    this.publicFields.forEach((field) => {
      if (dados.hasOwnProperty(field)) {
        newObject[field] = dados[field];
      }
    });

    return newObject;
  }

  filter(dados) {
    if (Array.isArray(dados)) {
      dados = dados.map((item) => {
        return this.filterObject(item);
      });
    } else {
      dados = this.filterObject(dados);
    }

    return dados;
  }
}

class SupplierSerializable extends Serializable {
  constructor(contentType) {
    super();
    this.contentType = contentType;
    this.publicFields = ["id", "empresa", "categoria"];
  }
}

module.exports = {
  Serializable: Serializable,
  SupplierSerializable: SupplierSerializable,
  formatAccept: ["application/json"],
};
