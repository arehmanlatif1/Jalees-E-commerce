const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({ name, email, password });
    if (user) {
        res.status(201).json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            token: generateToken(user._id) 
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

// Login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            token: generateToken(user._id) 
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Token generation
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { registerUser, loginUser };