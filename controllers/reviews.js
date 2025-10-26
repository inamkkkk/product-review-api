const Review = require('../models/Review');
const validator = require('../utils/validator');

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    const validationErrors = validator.validateReviewInput(req.body);
    if (validationErrors) {
        return res.status(400).json({ errors: validationErrors });
    }

    const review = new Review({
      productId,
      rating,
      comment,
      userId: req.user.id // Assuming user ID is available in req.user from auth middleware
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const validationErrors = validator.validateReviewInput(req.body);
    if (validationErrors) {
        return res.status(400).json({ errors: validationErrors });
    }

    review.productId = req.body.productId || review.productId;
    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};