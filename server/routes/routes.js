import express from 'express';
import {createUser, findUser} from '../../db/queries';

let router = express.Router();


router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/loggedin', (req, res) => {
  res.render('loggedin', {user: req.session.user.username })
});

router.get('/loggedout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

router.post('/login', (req, res) => {
  findUser(req.body.username)
    .then((data) => {
      req.session.regenerate(() => {
        req.session.user = data;
        res.redirect('/loggedin');
      });
    }, (err) => {
      console.log(err);
      res.redirect('/login');
    });
});

router.post('/adduser', (req, res) => {
  createUser(req.body.username)
    .then(() => {
      res.redirect('/login');
    }, (err) => {
      console.log(err);
      res.redirect('/login');
    });
});

export default router;
