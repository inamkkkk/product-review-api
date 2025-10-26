const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const authMiddleware = require('../middlewares/auth');

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.post('/', authMiddleware, reviewController.createReview);
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;