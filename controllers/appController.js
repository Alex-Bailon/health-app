const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passport')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const {
  checkAuth,
  forwardAuth
} = require('../config/middleware/isAuthenticated')
// get request when going to homepage with middleware to check if user is already logged in. If so forwards them to /userhome
router.get('/', forwardAuth, function (req, res) {
  res.render('index')
})
// get request to /userhome with middleware to ensure user is logged in.
router.get('/userhome', checkAuth, function (req, res) {
  res.render('userHome', {
    user: req.user
  })
})
// post request when user wants to login it will run middleware to check if everything matches
router.post('/api/login', passport.authenticate('local'), function (req, res) {
  res.json(req.user)
})
// post request for when the user wants to signup. Password is hashed.
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
// post request for when user looks up a food.
router.post('/api/food', function (req, res) {
  axios({
    method: 'GET',
    url:
      'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com',
      'x-rapidapi-key': '7414a69555mshdafeae439feb5b5p14f0dejsn72987a0fcc7a',
      useQueryString: true
    },
    params: {
      ingr: req.body.item
    }
  })
    .then(response => {
      res.json(response.data)
    })
    .catch(error => {
      console.log(error)
    })
})
// get request to log user out
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
