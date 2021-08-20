const jsontoxml = require("jsontoxml");

class Serializable {
  json(dados) {
    return JSON.stringify(dados);
  }

  xml(dados) {
    let tag = this.tagSingular;

    if (Array.isArray(dados)) {
      tag = this.tagPlural;
      dados = dados.map((item) => {
        return {
          [this.tagSingular]: item,
        };
      });
    }

    return jsontoxml({ [tag]: dados });
  }

  serialize(dados) {
    dados = this.filter(dados);
    if (this.contentType === "application/json") {
      return this.json(dados);
    }

    if (this.contentType === "application/xml") {
      return this.xml(dados);
    }

    throw new Error(
      // 'Não é possível serializar o tipo de conteúdo "' + this.contentType + '".'
      "Não é possível serializar o tipo de conteúdo."
    );
  }

  filterObject(dados) {
    const newObject = {};

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
  constructor(contentType, extrasFields) {
    super();
    this.contentType = contentType;
    this.publicFields = ["id", "empresa", "categoria"].concat(
      extrasFields || []
    );
    this.tagSingular = "supplier";
    this.tagPlural = "suppliers";
  }
}

class ErrorSerializable extends Serializable {
  constructor(contentType, extrasFields) {
    super();
    this.contentType = contentType;
    this.publicFields = ["message", "id"].concat(extrasFields || []);
    this.tagSingular = "error";
    this.tagPlural = "errors";
  }
}

module.exports = {
  Serializable: Serializable,
  SupplierSerializable: SupplierSerializable,
  ErrorSerializable: ErrorSerializable,
  formatAccept: ["application/json", "application/xml"],
};
