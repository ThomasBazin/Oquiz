require("dotenv/config");

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
  define: { // Settings qui s'appliquent pour TOUS nos modèles
    createdAt: "created_at", // On demande à Sequelize d'utiliser les attributs `created_at` au lieu de `createdAt`
    updatedAt: "updated_at" // On demande à Sequelize d'utiliser les attributs `updated_at` au lieu de `updatedAt`
  }
});

module.exports = sequelize;
