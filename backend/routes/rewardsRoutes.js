const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const reviewController = require('../controllers/reviewController');

// Reward Routes
router.get('/rewards', rewardController.getRewards);  // Get all rewards
router.post('/claim', rewardController.claimReward);  // Claim a reward

// Review Routes
router.post('/submit-review', reviewController.submitReview);  // Submit a review
router.get('/reviews', reviewController.getReviews);  // Get all reviews

module.exports = router;
