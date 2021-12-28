import express from 'express';
//import { movies, movieReviews, movieDetails } from './moviesData';
import uniqid from 'uniqid'
//import movieModel from './movieModel';
import tvShowModel from './tvShowModel';
import asyncHandler from 'express-async-handler';
import {
    getTVShowsPage
  } from '../tmdb-api';

const router = express.Router(); 

router.get('/', async (req, res) => {
    //const upcomingMovies = await getUpcomingMovies(page);
    //res.status(200).json(upcomingMovies);

    let { page = 1} = req.query; // destructure page and limit and set default values
    page = +page; //trick to convert to numeric (req.query will contain string values)

    console.info("Getting TVSHOWS");

    const tvShows = await getTVShowsPage(page);

    //const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    //const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    //const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    //const movies = await moviesPromise;

    //const returnObject = { page: page, total_pages: Math.ceil(upcomingMovies / limit), total_results: upcomingMovies, results: upcomingMovies };//construct return Object and insert into response object

    res.status(200).json(tvShows);
});

// Get TV Show details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const tvShow = await tvShowModel.findByTVShowDBId(id);
    if (tvShow) {
        res.status(200).json(tvShow);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));



// Get TV Show reviews
router.get('/tvshows/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (tvShowReviews.id == id) {
        res.status(200).json(tvShowReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

//Post a movie review
router.post('/tvshows/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (tvShowReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        tvShowReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

router.get('/tmdb/tvshows', asyncHandler( async(req, res) => {
    const tvShows = await getTVShows();
    res.status(200).json(tvShows);
  }));

export default router;