import express from 'express';
//import { genres } from './genresData';
//import Genre from './genreModel';
import Language from './languageModel';
//import uniqid from 'uniqid'
import {
    getLanguages
} from '../tmdb-api'

const router = express.Router(); 
//router.get('/', (req, res) => {
//    res.json(Genre);
//});

// Get all languages
router.get('/', async (req, res) => {
    const languages = await getLanguages();
    res.status(200).json(languages);
});

// Get language details
router.get('/languages', (req, res) => {
    const id = parseInt(req.params.id);
    if (Language.iso_639_1 == id) {
        res.status(200).json(Genre);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

export default router;