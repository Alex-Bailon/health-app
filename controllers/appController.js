const express = require('express')
let router = express.Router();
let db = require("../models");
let passport = require("../config/passport")
const bcrypt = require('bcryptjs');
const { checkAuth, forwardAuth } = require("../config/middleware/isAuthenticated");
;

router.get("/", forwardAuth, function (req, res) {
    res.render("index")
});

router.get("/userhome", checkAuth, function (req, res) {
    res.render("userHome", {
        user: req.user
    })
});

router.post("/api/login", function(req, res, next) {
    passport.authenticate("local", {
        successRedirect: '/userhome',
        failureRedirect: '/'
    })(req, res, next)
    // return res.json(req.user);
  });

router.post("/api/signup", function (req, res) {
    let { username, email, password } = req.body
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err
          password = hash
          db.User.create({
              email,
              username,
              password
          }).then(function () {
              res.redirect("/");
          }).catch(function (err) {
              console.log(err)
          })
      })
    })
})
          

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


module.exports = router;