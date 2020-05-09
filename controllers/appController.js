const express = require('express')
let router = express.Router();
let db = require("../models");
let passport = require("../config/passport");

router.get("/", function (req, res) {
    res.render("index");
});

app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
});

app.post("/api/signup", function (req, res) {
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

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


module.exports = router;