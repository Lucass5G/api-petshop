const Model = require("./ModelTableSupplier");
const NotFound = require("../../errors/NotFound");

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
      throw new NotFound();
    }
    return found;
  },

  update(id, dataForUpdate) {
    return Model.update(dataForUpdate, { where: { id: id } });
  },

  delete(id) {
    return Model.destroy({ where: { id: id } });
  },
};
