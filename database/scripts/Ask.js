const Sequelize = require("sequelize");
const connection = require("../database");

const Ask = connection.define("ask", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Ask.sync({ force: false }).then(() => {
  console.log("Table Ask created!");
});

module.exports = Ask;
