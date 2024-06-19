const { Router } = require("express");
const mainController = require("./controllers/mainController");
const levelController = require("./controllers/levelController.js");
const quizController = require("./controllers/quizController.js");
const tagsController = require("./controllers/tagsController.js");
const userController = require('./controllers/userController.js')
// Create router
const router = Router();

// Configure router
router.get("/", mainController.renderHomePage);

router.get("/levels", levelController.renderLevelsPage);
router.post("/levels", levelController.createLevel);

router.get("/quiz/:id", quizController.renderQuizPage);

router.get("/tags", tagsController.renderTagsPage);

router.get("/signup", userController.signupPage);
router.post("/signup", userController.addUser);

router.get("/login", userController.loginPage)

// Export router
module.exports = router;
