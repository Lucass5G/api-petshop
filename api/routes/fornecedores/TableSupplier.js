const Model = require("./ModelTableSupplier");

module.exports = {
  listAll() {
    return Model.findAll();
  },

  insert(fornecedor) {
    return Model.create(fornecedor);
  },

  async pickForId(id) {
    const found = await Model.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new Error("Supplier not found");
    }
    return found;
  },

  update(id, dataForUpdate) {
    return Model.update(dataForUpdate, { where: { id: id } });
  },
};