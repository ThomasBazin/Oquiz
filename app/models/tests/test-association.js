const { User, Quiz, Question, Level, Tag, Answer } = require("../associations.js");

// SQL : selectionner le "user" dont l'id vaut 1 ET RECUPERER EGALEMENT les quizzes qu'il/elle a créé.
/*
`
SELECT * FROM "user"
JOIN "quiz"
ON "user"."id" = "quiz"."author_id"
WHERE "user"."id" = 1;
`;
*/

main();

async function main() {

  // ==== Récupérer un USER et ses QUIZ ===
  const user1 = await User.findByPk(1, {
    include: "quizzes" // on utilise l'alias de l'association (raccourci !)
  });
  console.log(user1.toJSON());

  // ==== Récupérer le QUIZ n°3 et son auteur (USER) ====
  const quiz3 = await Quiz.findByPk(3, {
    include: "author" // AVEC ALIAS
    // include: "User" // SANS ALIAS
  });
  console.log(quiz3.toJSON());
  console.log(quiz3.author.firstname); // AVEC ALIAS
  // console.log(quiz3.User.firstname); // SANS ALIAS
  
  // === Récupérer le QUIZ 10 et ses QUESTIONS associés
  const quiz10 = await Quiz.findByPk(10, {
    include: "questions"
  });
  console.log(quiz10.toJSON());
  console.log(quiz10.questions.length);
  console.log(quiz10.questions[1].wiki);

  // === Récupérer 5 QUESTIONS et leur NIVEAU ===
  const questions = await Question.findAll({
    include: "level",
    limit: 5
  });
  console.log(JSON.stringify(questions, null, 2));
  console.log(questions.map(question => question.toJSON()));

  // === récupérer le niveau Expert et les questions associées
  const expertLevel = await Level.findOne({
    where: { name: "Expert" },
    include: "questions"
  });
  console.log(expertLevel.toJSON());

  // === Récupérer le quiz n°12 et tous les thèmes associés à ce quiz === 
  const quiz12 = await Quiz.findByPk(12, {
    include: "tags"
  });
  console.log(quiz12.toJSON());

  
  // === Récupérer le tag "Cinéma" et tous les quizzes associées
  const cineTag = await Tag.findOne({
    where: { name: "Cinéma" },
    include: "quizzes"
  });
  console.log(cineTag.toJSON());
  console.log(`Il y a ${cineTag.quizzes.length} films avec le tag : "${cineTag.name}".`);

  // === Récupérer la question 1 et toutes ses propositions
  const question1 = await Question.findByPk(1, {
    include: "propositions"
  });
  console.log(question1.toJSON());


  // === Récupérer la bonne réponse à la question n°2
  const question2 = await Question.findByPk(2, {
    include: "good_answer"
  });
  console.log(question2.toJSON());

  // === Trouver la question à laquelle la réponse "Un gland" répond
  const res = await Answer.findOne({
    where: { description: "Un gland" },
    include: "answered_question"
  });
  console.log(res.toJSON());
}
