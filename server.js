// Requiring necessary npm packages
const express = require('express')
const session = require('express-session')
// Requiring passport as we've configured it
const passport = require('./config/passport')
const routes = require('./controllers/appController')
const compression = require('compression')

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3000
var db = require('./models')

// Creating express app and configuring middleware needed for authentication
var app = express()
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(express.json())
app.use(express.static('public'))
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
)
app.use(passport.initialize())
app.use(passport.session())

// Requiring our routes
app.use(routes)

// set Handlebars
const exphbs = require('express-handlebars')
// set Handlebars default layout to main.handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      'Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    )
  })
})
