const { DataTypes, Model } = require('sequelize');
const sequelize = require("./dbClientSequelize.js");

class Level extends Model {}

Level.init({
  // == ATTRIBUT ==
  
  // id: {}, // Pas besoin : Sequelize le gère à notre place via le "Model"
  // created_at: {} // Pas besoin : Sequelize le gère à notre place via le "Model"
  // updated_at: {}, // Pas besoin : Sequelize le gère à notre place via le "Model"

  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  // == CONFIGURATION ==
  sequelize,
  tableName: "level",
  
  createdAt: "created_at", // Note : par défaut, Sequelize gère les attributs en camelCase. On précise pour ce champs d'utiliser plutôt du snake_case
  updatedAt: "updated_at"
});

module.exports = Level;
