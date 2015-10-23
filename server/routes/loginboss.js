import express from 'express';
import {createUser, findUser} from '../../db/queries';

let loginBoss = express.Router();

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

loginBoss.get('/', (req, res) => {
  res.redirect('/loggedin');
});

loginBoss.get('/login', (req, res) => {
  res.render('login');
});

loginBoss.get('/loggedin', restrict, (req, res) => {
  res.render('loggedin', {user: req.session.user.username });
});

loginBoss.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

loginBoss.post('/login', (req, res) => {
  findUser(req.body.username)
    .then((data) => {
      req.session.regenerate(() => {
        req.session.user = data;
        req.session.save(() => {
          res.redirect('/loggedin');
        })
      });
    }, (err) => {
      console.log(err);
      res.redirect('/login');
    });
});

loginBoss.post('/adduser', (req, res) => {
  createUser(req.body.username)
    .then(() => {
      res.redirect('/login');
    }, (err) => {
      console.log(err);
      res.redirect('/login');
    });
});

export default loginBoss;
