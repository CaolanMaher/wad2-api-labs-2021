import express from 'express';
//import { movies, movieReviews, movieDetails } from './moviesData';
import uniqid from 'uniqid'
//import movieModel from './movieModel';
import tvShowModel from './tvShowModel';
import asyncHandler from 'express-async-handler';
import {
    getTVShows
  } from '../tmdb-api';

const router = express.Router(); 

router.get('/tvshows', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    const tvShowsPromise = tvShowModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const tvShows = await tvShowsPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: tvShows };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));

// Get TV Show details
router.get('/tvshows/:id', asyncHandler(async (req, res) => {
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