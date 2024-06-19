const Answer = require("./Answer.js");
const Level = require("./Level.js");
const Question = require("./Question.js");
const Quiz = require("./Quiz.js");
const Tag = require("./Tag.js");
const User = require("./User.js");

// Sequelize Association
// cf : https://sequelize.org/docs/v6/core-concepts/assocs/

// ==> One-To-One ==> hasOne + belongsTo
// ==> One-To-Many ==> hasMany + belongsTo
// ==> Many-To-Many ==> belongsToMany + belongsToMany

// SOURCE.association(CIBLE);


// User <-> Quiz (One-to-Many)
User.hasMany(Quiz, {
  foreignKey: "author_id", // préciser la clé étrangère qui lie les deux tables/modèles
  as: "quizzes" // Aliaser l'association (nom au choix) : nom de la cible
});
Quiz.belongsTo(User, {
  foreignKey: "author_id", // préciser la clé étrangère qui lie les deux tables/modèles
  as: "author" // Alias (si je requête ma SOURCE, je veux donner quel nom à la CIBLE ?)
});

// Quiz <-> Question One-to-Many
Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
  as: "questions" // Si je requête un Quiz je veux pouvoir récupérer "ses questions"
});
Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  as: "quiz" // Si je requête une Question, je veux pouvoir récupérer "son quiz"
});

// Question <-> Level One-to-Many
Level.hasMany(Question, {
  foreignKey: "level_id",
  as: "questions" // Si je requête un Level, je veux récupérer ses "questions"
});
Question.belongsTo(Level, {
  foreignKey: "level_id",
  as: "level" // Si je requête une Question, je veux récupérer son "level"
});

// Quiz <-> Tag (Many-to-Many)
Quiz.belongsToMany(Tag, {
  through: "quiz_has_tag", // nom de la table de liaison
  foreignKey: "quiz_id", // nom de la clé étrangère dans la table SOURCE
  otherKey: "tag_id", // nom de la clé étrangère dans la table CIBLE
  as: "tags"
});
Tag.belongsToMany(Quiz, {
  through: "quiz_has_tag",
  foreignKey: "tag_id",
  otherKey: "quiz_id", // nom de la clé étrangère dans la table CIBLE
  as: "quizzes"
});
// Exemple : https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#aliases-and-custom-key-names


// Question <-> Answer (One-To-Many)
Question.hasMany(Answer, {
  foreignKey: "question_id",
  as: "propositions" // Quand je demande une question, je veux voir ses "answers" -> je propose "propositions"
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question"
});

// Question <-> Answer (One-To-One : stocker la BONNE réponse à la question)
Answer.hasOne(Question, {
  foreignKey: "good_answer_id",
  as: "answered_question" // on a le choix (potentiellement "good_question" / "question_it_answers")
});
Question.belongsTo(Answer, {
  foreignKey: "good_answer_id",
  as: "good_answer" // on a le choix
});
// Cf doc pour trouver le sens : https://sequelize.org/docs/v6/core-concepts/assocs/#implementation


// ⚠️ On oublie pas d'exporter nos modèles pour profiter des associations
module.exports = { Answer, Level, Question, Quiz, Tag, User };
