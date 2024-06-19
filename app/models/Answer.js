const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbClientSequelize.js");

class Answer extends Model {}

Answer.init({
  // Attributes (ie, les propriétés)
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  // Options (ie, la configuration)
  sequelize,
  tableName: "answer"
});


module.exports = Answer;

