import express from 'express';
import bodyParser from 'body-parser';
import verifySession from '../utils/verifysession';
import { loginGet, appStart, logoutPost, loginPost, userPost } from './routehandlers';

let loginBoss = express.Router();

loginBoss.use(bodyParser.urlencoded({extended: false}));


loginBoss.get('/login', loginGet);

loginBoss.get('/app', verifySession, appStart);

loginBoss.post('/login', loginPost);

loginBoss.post('/logout', logoutPost);

loginBoss.post('/user', userPost);

export default loginBoss;
