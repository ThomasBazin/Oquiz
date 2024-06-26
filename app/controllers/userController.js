const { User } = require("../models");
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');

const userController = {
  signupPage(req, res) {
    res.render("signup")
  },

  async addUser(req, res) {
    try {

      const { firstname, lastname, email, password, confirmation} = req.body;
  
      if (!firstname || !lastname || !email || !password || !confirmation) {
        res.status(400).render("signup", {errorMsg: "Tous les champs sont obligatoires !"})
      }
  
      if (!emailValidator.validate(email)) {
        res.status(400).render("signup", {errorMsg: "L'email n'est pas valide !"})
      }
  
      const passwordPattern = new passwordValidator().is().min(12).has().digits(1);
  
      if (!passwordPattern.validate(password)) {
        res.status(400).render("signup", {errorMsg: "Le mot de passe doit faire au minimum 12 caractères et contenir au moins 1 chiffre !"})
      }

      if (password !== confirmation) {
        res.status(400).render("signup", {errorMsg: "Erreur dans la confirmation du mot de passe  !"})
      }
  
      if (await User.findOne({where: {email: email}})) {
        res.status(409).render("signup", {errorMsg: "Désolé, cet e-mail est déjà utilisé"})
      }

      
      const saltRounds = parseInt(process.env.SALT_ROUNDS || 10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword
      })

      res.render("login", {successMsg: "Vous êtes bien inscrit, merci de vous authentifier."})
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  loginPage(req, res) {
    res.render("login")
  },

  async userLogin(req, res) {
    try {
      const userEmail = req.body.email;

      const storedUser = await User.findOne({where : {email: userEmail}})
      if (!storedUser || ! await bcrypt.compare(req.body.password, storedUser.password)) {
        res.status(409).render("login", {errorMsg: "Erreur sur l'e-mail ou le mot de passe"})
      }

      req.session.userId = storedUser.id;
      console.log(req.session.userId)

    


    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
    
  }
}

module.exports = userController;