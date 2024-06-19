const { Quiz, User } = require("../associations.js");

main();

async function main() {
  // Récupérer le quiz dont l'id est 1 avec à la fois ses tags ET ses questions !
  const quiz = await Quiz.findByPk(1, {
    include: ["tags", "questions"],
  });
  console.log(quiz.toJSON());


  // Récuperer l'utilisateur Chuck, ses quizzes et les tags de ses quizzes

  const user = await User.findOne({
    where: { firstname: "Chuck" },
    
    // include: ["quizzes", "tags"] // ❌ les User n'ont pas de "tags"

    // ✅ include: "quizzes"
    // ✅ include: ["quizzes"]
    // ✅ include: { association: "quizzes" }

    include: {
      association: "quizzes",
      include: "tags" // va chercher l'association "tags" du modèle "quizzes" (ie, Quiz)
    }

  });
  console.log(user.toJSON());


  const users = await User.findAll({
    limit: 2,
    order: [["firstname", "ASC"]],
    attributes: ["firstname", "email"],
    include: { association: "quizzes", attributes: ["title"] },
  });
  console.log(JSON.stringify(users, null, 2));

}

