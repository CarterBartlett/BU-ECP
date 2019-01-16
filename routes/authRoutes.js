// Route handlers to deal with authentication to the system (primarily Google OAuth)
const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
  app.get('/api/logout', (req,res) =>{
    req.logout();
    res.redirect('/');
  })
};
