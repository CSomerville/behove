export default function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    if (!req.accepts('html')) {
      res.sendStatus(401)
    } else {
      res.redirect('/login');
    }
  }
}
