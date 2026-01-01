const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

// POST /api/auth/verify
router.post('/verify', verifyToken, authController.verifyUser);

module.exports = router;
