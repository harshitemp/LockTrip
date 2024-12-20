const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: String,
  pointsRequired: Number
});

module.exports = mongoose.model('Reward', rewardSchema);
