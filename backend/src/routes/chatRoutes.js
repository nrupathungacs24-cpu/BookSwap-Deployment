const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, chatController.getUserChats);
router.get('/:chatId/messages', verifyToken, chatController.getChatMessages);
router.post('/:chatId/messages', verifyToken, chatController.sendMessage);

module.exports = router;
