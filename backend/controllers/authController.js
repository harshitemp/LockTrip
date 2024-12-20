const crypto = require('crypto');
const { recoverPersonalSignature } = require('@metamask/eth-sig-util');
const User = require('../models/Users');

const nonces = new Map();

exports.getNonceToSign = (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  const nonce = crypto.randomBytes(16).toString('hex');
  nonces.set(address, nonce);

  res.json({ nonce });
};

exports.verifySignedMessage = async (req, res) => {
  const { address, signature } = req.body;

  if (!address || !signature) {
    return res.status(400).json({ message: 'Address and signature are required' });
  }

  const nonce = nonces.get(address);

  if (!nonce) {
    return res.status(400).json({ message: 'Nonce not found for address' });
  }

  try {
    const recoveredAddress = recoverPersonalSignature({
      data: nonce,
      signature: signature,
    });

    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      // Save user to database
      let user = await User.findOne({ address });

      if (!user) {
        user = new User({ address });
        await user.save();
      }

      nonces.delete(address);
      return res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Signature verification failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
