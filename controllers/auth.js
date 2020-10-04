const ErrorRespone = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create User
  const user = await User.create({
    name, email, password, role
  });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorRespone('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorRespone('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorRespone('Invalid credentials', 401));
  }

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });

});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  console.log(req.user);

  res.status(200).json({
    success: true,
    data: user
  });
});