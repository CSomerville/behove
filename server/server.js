import express from 'express';
import session from 'express-session';
import logger from 'morgan';
import cons from 'consolidate';
import pgSession from 'connect-pg-simple';
import loginBoss from './routes/loginboss/router';
import apiRoutes from './routes/api/router';

let app = express();

app.engine('html', cons.mustache);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));

app.use(session({
  store: new (pgSession(session))(),
  secret: 'bzzzbzzzbzz',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  resave: false,
  saveUninitialized: false
}));

app.use(express.static('bundle'));

app.use('/', loginBoss);
app.use('/api', apiRoutes);

app.listen(app.get('port'), () => {
  console.log('server is listening on ', app.get('port'));
});
