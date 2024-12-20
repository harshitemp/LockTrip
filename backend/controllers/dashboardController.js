// controllers/dashboardController.js
const User = require('../models/user');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.params.userId;  // Assuming user ID is passed in the URL
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const dashboardData = {
      points: user.points,
      upcomingBookings: user.bookings.filter(booking => new Date(booking.checkInDate) > new Date()),
    };

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};
