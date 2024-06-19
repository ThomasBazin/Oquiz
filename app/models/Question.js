const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbClientSequelize.js");

class Question extends Model {}

Question.init({
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  wiki: {
    type: DataTypes.TEXT
  },
  anecdote: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  tableName: "question"
});


module.exports = Question;

// On test
// Question.findAll();
