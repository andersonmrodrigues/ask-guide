const Sequelize = require("sequelize");
const connection = require("../database");

const Answer = connection.define("answer", {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  askId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Answer.sync({
  force: false,
})
  .then(() => {
    console.log("Table Answer created!");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = Answer;
