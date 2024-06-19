const { Quiz } = require("../models");


const mainController = {
  async renderHomePage(req, res) {
    try {
      const quizzes = await Quiz.findAll({
        include: ["author","tags"],
        order: [["title", "ASC"]]
      });
      res.render("home", {quizzes});

    } catch(error) {
      console.error(error);
      res.status(500).render("500");
    }
  }
};

module.exports = mainController;

// SELECT * FROM "quiz" JOIN "user" ON "quiz"."author_id" = "user"."id"