// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, default: 0 },
  bookings: [
    {
      hotelName: { type: String, required: true },
      checkInDate: { type: Date, required: true },
      checkOutDate: { type: Date, required: true },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
