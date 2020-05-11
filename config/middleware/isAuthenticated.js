// This is middleware for restricting routes a user is not allowed to visit if not logged in
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
