const express = require('express');
const { getNonceToSign, verifySignedMessage } = require('../controllers/authController');
const router = express.Router();

// Routes for MetaMask authentication
router.post('/getNonceToSign', getNonceToSign);
router.post('/verifySignedMessage', verifySignedMessage);

module.exports = router;
