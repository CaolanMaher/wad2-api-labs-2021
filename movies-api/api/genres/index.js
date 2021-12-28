import express from 'express';
//import { genres } from './genresData';
import Genre from './genreModel';
//import uniqid from 'uniqid'
import {
    getGenres
} from '../tmdb-api'

const router = express.Router(); 
//router.get('/', (req, res) => {
//    res.json(Genre);
//});

// Get all genres
router.get('/', async (req, res) => {
    //const genres = await Genre.find();
    const genres = await getGenres();
    res.status(200).json(genres);
});

// Get genre details
router.get('/genres', (req, res) => {
    const id = parseInt(req.params.id);
    if (Genre.id == id) {
        res.status(200).json(Genre);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

export default router;