module.exports = function(app) {

  //SIGN UP
  app.get('/signup', function (req, res) {
    res.render('signup');
  });

  //LOGIN
  app.get('/login', function(req, res) {
    res.render('login');
  });

}
