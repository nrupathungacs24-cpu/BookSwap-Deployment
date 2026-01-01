const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, requestController.sendRequest);
router.get('/sent', verifyToken, requestController.getSentRequests);
router.get('/received', verifyToken, requestController.getReceivedRequests);
router.put('/:id/status', verifyToken, requestController.updateRequestStatus);

module.exports = router;
