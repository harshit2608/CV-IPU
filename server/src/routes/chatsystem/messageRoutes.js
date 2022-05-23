const express = require('express');

const messageController = require('../../controllers/chatsystem/messageController');
const { protect } = require('../../middlewares/middlewares');

const router = express.Router();

router.post('/', protect, messageController.newMessages);
router.get('/:conversationId', protect, messageController.getMessages);

module.exports = router;
