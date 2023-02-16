const Sequelize = require("sequelize");
const connection = new Sequelize("ask_guide", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
