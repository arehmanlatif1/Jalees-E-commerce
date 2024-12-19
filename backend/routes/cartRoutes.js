const express = require('express');
const { addItemToCart, getCartItems } = require('../controllers/cartController');
const router = express.Router();

router.post('/', addItemToCart);
router.get('/:userId', getCartItems);

module.exports = router;
