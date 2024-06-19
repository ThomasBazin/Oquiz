const { Level } = require("../models");

const levelController = {
  async renderLevelsPage(req, res) {
    try {

      // Récupérer tous les levels de la BDD
      const levels = await Level.findAll({
        order: [['name', 'ASC']],
        include: "questions"
      });
      
      // console.log(JSON.stringify(levels, null, 2));
      
      // On donne les levels à la vue
      res.render("levels", { levels });

    } catch (error) {
      console.error(error); // Pour se debug au cas où une erreur apparait
      res.status(500).render("500");
    }
  },

  async createLevel(req, res) {
    try {

      // Récupérer les informations du Body de la requête
      const name = req.body.name; // name du level à créer en BDD
  
      // Créer un Level dans la BDD
      await Level.create({ name });
  
      // Rediriger vers la page /levels
      res.redirect("/levels");

    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  }
};

module.exports = levelController;
