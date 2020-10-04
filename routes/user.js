const express = require('express');
const { 
    getUsers, createUser, getUser, updateUser, deleteUser
} = require('../controllers/user');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getUsers).post(protect, createUser);
router.route('/:id').get(protect, getUser).put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;