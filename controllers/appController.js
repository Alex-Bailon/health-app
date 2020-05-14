const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passport')
const bcrypt = require('bcryptjs')
const axios = require("axios");
const {
  checkAuth,
  forwardAuth
} = require('../config/middleware/isAuthenticated')
router.get('/', forwardAuth, function (req, res) {
  res.render('index')
})

router.get('/userhome', checkAuth, function (req, res) {
  res.render('userHome', {
    user: req.user
  })
})

router.post('/api/login', passport.authenticate('local'), function(req, res) {
  res.json(req.user)
})

  // return res.json(req.user);


router.post('/api/signup', function (req, res) {
  let { username, email, password } = req.body
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err
      password = hash
      db.User.create({
        email,
        username,
        password
      })
        .then(function () {
          res.redirect('/')
        })
        .catch(function (err) {
          console.log(err)
        })
    })
  })
})

router.post("/api/food", function(req,res){
  // get data from edamam
  // get user id from req.headers
  // add data from edamam to food item table
  // join table user_food 
  // get all food for user
  // send it back
  // possibly add controllers for different files i.e. user_food
  console.log("This works")
  console.log(req.headers["x-user-id"])
  axios({
    "method":"GET",
    "url":"https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"edamam-edamam-nutrition-analysis.p.rapidapi.com",
    "x-rapidapi-key":"7414a69555mshdafeae439feb5b5p14f0dejsn72987a0fcc7a",
    "useQueryString":true
    },"params":{
    "ingr":req.body.item
    }
    })
    .then((response)=>{
     
      res.json(response.data)
    })
    .catch((error)=>{
      console.log(error)
    });
  })

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
});

module.exports = router
