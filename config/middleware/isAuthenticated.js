// This is middleware for restricting routes a user is not allowed to visit if not logged in
// This code was inspired by https://github.com/bradtraversy/node_passport_login/blob/master/config/auth.js
module.exports = {
  checkAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  },
  forwardAuth: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next()
    }
    res.redirect('/userhome')
  }

}
