import './seedData'
import './db';
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import usersRouter from './api/users';
import genresRouter from './api/genres';
import tvShowsRouter from './api/tvshows';
import languagesRouter from './api/languages'
import session from 'express-session';
import passport from './authenticate';

dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();

const fs = require('fs');

const path = require('path');

const appLogStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });

const morgan = require('morgan');

const port = process.env.PORT;

app.use(passport.initialize());

//app.use(express.static('public'));

app.use(express.json());

/*

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json( {
    status: err.status,
    message: err.message
  });
});

*/

/*
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});
*/

morgan.token('id', (req) => req.params.id);
//morgan.token('body', (req) => req.params.username);

app.use(morgan(':id, :date, :url :method ', { stream: appLogStream} ) );

app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
//app.use('/api/movies', moviesRouter);

app.use('/api/tvshows', tvShowsRouter);

app.use('/api/genres', genresRouter);

app.use('/api/languages', languagesRouter);

//Users router
app.use('/api/users', usersRouter);

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});