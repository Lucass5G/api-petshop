const Sequelize = require("sequelize");
const instance = require("../../database");

const columns = {
  empresa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categoria: {
    type: Sequelize.ENUM("ração", "brinquedos"),
    allowNull: false,
  },
};

const options = {
  freezeTableName: true,
  tableName: "fornecedores",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  version: "version",
};

module.exports = instance.define("fornecedor", columns, options);
