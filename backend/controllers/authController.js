const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        console.log('Registration request received:', req.body);
        const { fullName, email, password } = req.body;

        // Create user
        const user = await User.create({
            fullName,
            email,
            password,
        });

        console.log('User created successfully:', user.email);
        sendTokenResponse(user, 201, res);
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    console.log('Generating JWT token for user:', user._id);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    console.log('Token generated successfully');
    const response = {
        success: true,
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    };

    console.log('Sending response:', JSON.stringify(response, null, 2));
    res.status(statusCode).json(response);
};
