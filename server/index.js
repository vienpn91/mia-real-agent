/* eslint consistent-return:0 import/order:0 */


import express from 'express';
import { resolve } from 'path';
import dotenv from 'dotenv';
import logger from './logger';
import argv from './argv';
import port from './port';
import passport from './middlewares/authenticateMiddlewares';
import setup from './middlewares/frontendMiddleware';

const app = express();

console.log('PATH', process.cwd());
dotenv.config(resolve(process.cwd(), '.env'));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});
app.use(passport.initialize());

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/login/facebook',
  passport.authenticate('facebook', {
    session: false,
    scope: ['email'],
  }));

app.get('/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    res.redirect('/');
  });

// Start your app.
app.listen(port, host, async (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
