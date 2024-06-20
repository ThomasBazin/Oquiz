const session = require('express-session');

const sessionMiddleWare = session ({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUnitialized: true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
})

module.exports = sessionMiddleWare;