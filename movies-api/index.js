import './seedData'
import './db';
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import usersRouter from './api/users';
//import genres from './api/genres';

dotenv.config();

const app = express();

const port = process.env.PORT;

//app.use(express.static('public'));

app.use(express.json());

app.use('/api/movies', moviesRouter);

//app.use('/api/genres', genres);

//Users router
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});