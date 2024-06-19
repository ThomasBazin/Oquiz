const { Quiz } = require("../models");

const quizController = {
  async renderQuizPage(req, res, next) {
    
    const quizId = parseInt(req.params.id);
      
    try {
      const askedQuiz = await Quiz.findByPk(quizId, {
        attributes: ["title", "description", "created_at"],

        include: [{
          association: "author",
          attributes: ["firstname", "lastname"]
        }, {
          association: "tags",
          attributes: ["name"]
        }, {
          association: "questions",
          attributes: ["description"],
          include: [{
            association: "level",
            attributes: ["name"]
          },{
            association: "propositions",
            attributes: ["description"]
          }]
        }]
      });  
      if (askedQuiz === null) { 
        next(); 
        return; 
      }

      console.log(JSON.stringify(askedQuiz.questions, null, 2));
      res.render("quiz", {askedQuiz}); 
     
    } catch(error) {    
      console.error(error);
      res.status(500).render("500");
    }
  }
};

module.exports = quizController;