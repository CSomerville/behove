import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import pgSession from 'connect-pg-simple';
import {db} from '../db/connection';

let app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  store: new (pgSession(session))(),
  secret: 'bzzzbzzzbzz',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  resave: false,
  saveUninitialized: false
}));

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access Denied';
    res.redirect('/login');
  }
}

app.get('/login', (req, res) => {
  res.send('<form action="/login" method="POST">' +
    '<input type="text" name="username"><button type="submit">ung</button></form>' +
    '<form action="/adduser" method="POST">' +
    '<input type="text" name="username"><button type="submit">dork</button></form>')
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.get('/loggedin', restrict, (req, res) => {
  res.send('hi');
});

app.post('/login', (req, res) => {
  db.task((t) => {
    return t.one("SELECT * FROM users WHERE username='" + req.body.username + "';");
  })
    .then((data) => {
      console.log(data);
      req.session.regenerate(() => {
        req.session.user = data.id;
        res.redirect('/loggedin');
      });
    }, (err) => {
      console.log(err);
      res.redirect('/login');
    });
});

app.post('/adduser', (req, res) => {
  db.task((t) => {
    return t.none("INSERT INTO users (username) VALUES ('" + req.body.username + "')");
  })
    .then(() => {
      console.log('user created');
      res.redirect('/loggedin');
    }, (err) => {
      console.log(err);
    });
});


app.listen(app.get('port'), () => {
  console.log('server is listening on ', app.get('port'));
});
