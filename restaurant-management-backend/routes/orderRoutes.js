const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
  const { customerName, contact, dish, quantity, total } = req.body;
  try {
    const newOrder = new Order({ customerName, contact, dish, quantity, total });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error });
  }
});

module.exports = router;
