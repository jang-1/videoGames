const express = require('express');
const {addReview, getReviews, editReview, deleteReview} = require('../controllers/reviews');

const router = express.Router();


// Endpoint do dodawania recenzji
router.post('/addReview', addReview);

// Endpoint do pobierania recenzji dla określonej gry
router.get('/:gameId', getReviews);

// Endpoint do edycji recenzji
router.put('/:reviewId', editReview);

// Endpoint do usuwania recenzji
router.delete('/:reviewId', deleteReview);

module.exports = router;
