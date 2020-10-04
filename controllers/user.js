const ErrorRespone = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/v1/users
exports.getUsers = asyncHandler( async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({
		success: true,
		count: users.length,
		data: users
	});
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
exports.getUser = asyncHandler( async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new ErrorRespone(`user not found with id of ${req.params.id}`, 404));	
	}

	res.status(200).json({
		success: true,
		data: user
	});
});

// @desc    Create new user
// @route   POST /api/v1/users
exports.createUser = asyncHandler( async (req, res, next) => {
	
	const user = await User.create(req.body);

	res.status(201).json({
		success: true,
		data: user
	});
	
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
exports.updateUser = asyncHandler( async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if (!user) {
		return next(new ErrorRespone(`User not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: user });
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
exports.deleteUser = asyncHandler( async (req, res, next) => {

	const user = await User.findByIdAndRemove(req.params.id);

	if (!user) {
		return next(new ErrorRespone(`User not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: {} });
});