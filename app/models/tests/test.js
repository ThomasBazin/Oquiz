const { Op } = require("sequelize");

const Level = require("../Level.js");
const User = require("../User.js");
const Tag = require("../Tag.js");
const Quiz = require("../Quiz.js");
const Question = require("../Question.js");
const Answer = require("../Answer.js");

main();

async function main() {
  // ==== METHODE (de classe) findByPk =====
  
  const level1 = await Level.findByPk(1);
  console.log(level1); // Level { id, name, created_at, updated_at, destroy(), save(), update() }    // ===> un "Active Record" de notre level de la BDD
  console.log(level1.name); // "Débutant"
  console.log(level1.id); // 1
  console.log(level1.created_at); // 2024-06-13T09:27:56.781Z
  console.log(level1.get()); // { id: 1, name, created_at, updated_at }     // ===> Données brutes de ce qu'on a en BDD


  // ==== METHODE (de classe) findAll =====

  const levels = await Level.findAll();
  console.log(levels); // [{}, {}, {}, {}]
  console.log(levels.length);
  console.log(levels.map(level => level.get())); // Pour observer les données brutes
  console.log(JSON.stringify(levels, null, 2)); // Idem, pour observer les données brutes

  // ==== METHODE (d'instance) .save() ===
  const bob = new User({
    firstname: "Bob",
    lastname: "L'éponge",
    email: "bob@bikini.io",
    password: "ILovePatrick!"
  });
  await bob.save();

  // ==== METHODE (de classe) .create() ====
  const patrick = await User.create({
    firstname: "Patrick",
    lastname: "L'étoile de mer",
    email: "patrick@bikini.io",
    password: "B0b4Ever!"
  });
  console.log(patrick.get());


  // === TAG ===
  const cookingTag = new Tag({ name: "Cuisine" });
  await cookingTag.save();


  // === QUIZ ===
  const quizzes = await Quiz.findAll({ limit: 3 });
  console.log(quizzes); // données "Sequelize"
  console.log(JSON.stringify(quizzes, null, 2));

  // === QUESTION ===

  // Je veux récupérer UNE question qui comporte dans sa description le mot "Disney"
  // SQL : SELECT * FROM "question" WHERE "description" LIKE '%Disney%' LIMIT 1;
  // SQL : SELECT * FROM "question" WHERE "description" ILIKE '%disney%' LIMIT 1;
  const disneyQuestion = await Question.findOne({
    where: {
      description: {
        [Op.iLike]: '%Disney%'
      }
    }
  });
  console.log(disneyQuestion.get());

  // === ANSWER ===
  const answer4 = await Answer.findByPk(4);
  console.log(answer4);
}
