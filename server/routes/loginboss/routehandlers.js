import { findUser, createUser } from '../../../db/queries';

export function loginGet(req, res) {
  res.render('login');
}

export function appStart(req, res) {
  res.render('appstart', {user: req.session.user.username });
}

export function logoutPost(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

export function loginPost(req, res) {
  findUser(req.body.username)
    .then((data) => {
      req.session.regenerate(() => {
        req.session.user = data;
        req.session.save(() => {
          res.redirect('/app');
        })
      });
    }, (err) => {
      console.log(err);
      res.redirect('/login');
    });
}

export function userPost(req, res) {
  createUser(req.body.username)
    .then(() => {
      res.redirect('/login');
    }, (err) => {
      console.log(err);
      res.redirect('/login');
    });
}
