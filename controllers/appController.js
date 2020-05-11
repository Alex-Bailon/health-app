const express = require('express')
let router = express.Router();
let db = require("../models");
let passport = require("../config/passport")
const { checkAuth, forwardAuth } = require("../config/middleware/isAuthenticated");
;

router.get("/", forwardAuth, function (req, res) {
    res.render("index")
});

router.get("/userhome", checkAuth, function (req, res) {
    res.render("userHome")
});

router.post("/api/login", function(req, res, next) {
    passport.authenticate("local", {
        successRedirect: '/userhome',
        failureRedirect: '/'
    })(req, res, next)
    // return res.json(req.user);
  });

router.post("/api/signup", function (req, res) {
    const { username, email, password } = req.body
    db.User.create({
        email,
        username,
        password
    }).then(function () {
        res.redirect("/");
    }).catch(function (err) {
        res.status(401).json(err);
    });
});

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


module.exports = router;