const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Public Routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Protected Routes
router.post('/', verifyToken, bookController.addBook);
router.delete('/:id', verifyToken, bookController.deleteBook);

module.exports = router;
