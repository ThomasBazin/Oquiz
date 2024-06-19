const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbClientSequelize.js");

class Quiz extends Model {}

Quiz.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  tableName: "quiz"
});


// On test si la requête semble passée : on check le log "Executing" de Sequelize
// Quiz.findAll();

module.exports = Quiz;