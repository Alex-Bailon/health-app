const express = require('express')
let router = express.Router();
let db = require("../models");
let passport = require("../config/passport")
var isAuthenticated = require("../config/middleware/isAuthenticated");
;

router.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
        res.render("userHome")
    }
    res.render("index")
});

router.get("/userhome", isAuthenticated, function (req, res) {
    res.render("userHome")
});

router.post("/api/login", passport.authenticate('local', { successRedirect: '/userhome', failureRedirect: '/' }));


router.post("/api/signup", function (req, res) {
    db.User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }).then(function () {
        res.redirect(307, "/api/login");
    }).catch(function (err) {
        res.status(401).json(err);
    });
});

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


module.exports = router;