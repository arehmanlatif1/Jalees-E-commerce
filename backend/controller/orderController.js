const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    }

    const order = new Order({
        user: req.user._id,
        orderItems,
        paymentMethod,
        totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});

// Get user orders
const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// Get all orders (Admin)
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'id name');
    res.json(orders);
});

module.exports = { createOrder, getUserOrders, getAllOrders };
