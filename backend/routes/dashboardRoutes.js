// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Route to get user dashboard data
router.get('/dashboard/:userId', dashboardController.getDashboardData);

module.exports = router;
