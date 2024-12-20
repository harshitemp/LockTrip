const Review = require('../models/Review');

// Submit a review
exports.submitReview = async (req, res) => {
  const { rating, comment } = req.body;

  if (rating && comment) {
    try {
      const newReview = new Review({ rating, comment });
      await newReview.save();
      res.status(200).json({ message: 'Thank you for your review!' });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting review', error });
    }
  } else {
    res.status(400).json({ message: 'Please provide a rating and a comment' });
  }
};

// Get all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};
