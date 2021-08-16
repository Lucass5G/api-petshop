const sequelize = require("sequelize");
const config = require("config");

const instance = new sequelize(
  config.get("mysql.database"),
  config.get("mysql.user"),
  config.get("mysql.password"),
  {
    host: config.get("mysql.host"),
    dialect: "mysql",
  }
);

module.exports = instance;
