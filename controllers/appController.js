const express = require('express')
let router = express.Router();
let db = require("../models");

router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;