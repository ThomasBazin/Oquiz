const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbClientSequelize.js");

class Tag extends Model {}

Tag.init({
  // Attributes (ie, les propriétés)
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  // Options (ie, la configuration)
  sequelize,
  tableName: "tag"
});


module.exports = Tag;

