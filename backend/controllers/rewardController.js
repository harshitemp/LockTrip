const Reward = require('../models/Reward');

// Get all rewards
exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.status(200).json(rewards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rewards', error });
  }
};

// Claim a reward
exports.claimReward = async (req, res) => {
  const { pointsRequired, userPoints } = req.body;

  if (userPoints >= pointsRequired) {
    try {
      // Logic for claiming a reward
      res.status(200).json({ message: `Reward claimed for ${pointsRequired} points!` });
    } catch (error) {
      res.status(500).json({ message: 'Error claiming reward', error });
    }
  } else {
    res.status(400).json({ message: 'Not enough points to claim the reward' });
  }
};
