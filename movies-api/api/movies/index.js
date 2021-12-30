import express from 'express';
import { movies, movieReviews, movieDetails } from './moviesData';
import uniqid from 'uniqid';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import { 
    getMoviesPage,
    getUpcomingMovies,
    getMovie,
    getMovieImages,
    getMovieReviews,
    getTopRatedMovies
} from '../tmdb-api';
//import { getMovieImages } from '../../../moviesApp/src/api/tmdb-api';

const router = express.Router(); 

//const morgan = require('morgan');

router.get('/', asyncHandler(async (req, res) => {
    //const upcomingMovies = await getUpcomingMovies(page);
    //res.status(200).json(upcomingMovies);

    console.info("Getting Movies");

    let { page = 1} = req.query; // destructure page and limit and set default values
    page = +page; //trick to convert to numeric (req.query will contain string values)

    const movies = await getMoviesPage(page);

    //const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    //const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    //const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    //const movies = await moviesPromise;

    //const returnObject = { page: page, total_pages: Math.ceil(upcomingMovies / limit), total_results: upcomingMovies, results: upcomingMovies };//construct return Object and insert into response object

    res.status(200).json(movies);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {

    //console.info("Get Movie Called");

    const id = parseInt(req.params.id);

    const movieDetails = await getMovie(id);

    //const movie = await movieModel.findByMovieDBId(id);
    if (movieDetails) {
        res.status(200).json(movieDetails);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie reviews
router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    console.info("Fetching Movie Reviews");

    const movieReviews = await getMovieReviews(id);

    // find reviews in list
    if (movieReviews) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
}));

// Get movie images
router.get('/:id/images', asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);

    console.info("Calling getMovieImages");

    const movieImages = await getMovieImages(id);

    // find reviews in list
    if (movieImages) {
        res.status(200).json(movieImages);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
}));

//Post a movie review
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

router.get('/tmdb/upcoming', asyncHandler( async(req, res) => {
    //const upcomingMovies = await getUpcomingMovies(page);
    //res.status(200).json(upcomingMovies);

    let { page = 1} = req.query; // destructure page and limit and set default values
    page = +page; //trick to convert to numeric (req.query will contain string values)

    const upcomingMovies = await getUpcomingMovies(page);

    //const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    //const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    //const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    //const movies = await moviesPromise;

    //const returnObject = { page: page, total_pages: Math.ceil(upcomingMovies / limit), total_results: upcomingMovies, results: upcomingMovies };//construct return Object and insert into response object

    res.status(200).json(upcomingMovies);
  }));

  router.get('/tmdb/top_rated', asyncHandler( async(req, res) => {
    //const upcomingMovies = await getUpcomingMovies(page);
    //res.status(200).json(upcomingMovies);

    //let { page = 1} = req.query; // destructure page and limit and set default values
    //page = +page; //trick to convert to numeric (req.query will contain string values)

    const upcomingMovies = await getTopRatedMovies();

    //const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    //const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    //const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    //const movies = await moviesPromise;

    //const returnObject = { page: page, total_pages: Math.ceil(upcomingMovies / limit), total_results: upcomingMovies, results: upcomingMovies };//construct return Object and insert into response object

    res.status(200).json(upcomingMovies);
  }));

export default router;