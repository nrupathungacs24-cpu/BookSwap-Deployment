const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

// GET /api/users/profile/:uid (Public)
router.get('/profile/:uid', userController.getUserProfile);

// PUT /api/users/profile (Protected)
router.put('/profile', verifyToken, userController.updateUserProfile);

// GET /api/users/:uid/books (Public)
router.get('/:uid/books', userController.getUserBooks);

module.exports = router;
