const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = { getUserProfile, updateUserProfile };
