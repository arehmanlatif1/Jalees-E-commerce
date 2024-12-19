const express = require('express');
const { createOrder, getUserOrders, getAllOrders } = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createOrder); // Create order
router.get('/myorders', protect, getUserOrders); // Get user orders
router.get('/', protect, admin, getAllOrders); // Get all orders (admin only)

module.exports = router;
