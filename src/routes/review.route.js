const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');
router.post('/create', reviewController.createReview);
router.get('/:id', reviewController.getDetails);

module.exports = router;
