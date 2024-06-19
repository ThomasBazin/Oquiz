// Load environment variables
require("dotenv/config");

// Import des dépendances
const express = require("express");
const router = require("./app/router");
const middleware404 = require("./app/middlewares/middleware404");

// Create Express app
const app = express();

// Configure static folder
app.use(express.static("./public"));

// Configure view engine
app.set("view engine", "ejs");
app.set("views", "./app/views");

// Configure body parsers
app.use(express.urlencoded({ extended: true }));

// Configure routes
app.use(router);

// Configure page 404
app.use(middleware404);    

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
