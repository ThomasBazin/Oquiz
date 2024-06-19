const { DataTypes, Model } = require('sequelize');
const sequelize = require("./dbClientSequelize.js");

class User extends Model {
  get fullname() {
    return `${this.firstname} ${this.lastname}`
  }
}

User.init({
  firstname: {
    type: DataTypes.TEXT
  },
  lastname: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false // Le champ n'est PAS:  "NOT NULL"
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  }

}, {
  sequelize,
  tableName: "user",
});

module.exports = User;
