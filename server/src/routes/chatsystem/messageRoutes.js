const express = require('express');

const messageController = require('../../controllers/chatsystem/messageController');
const { protect } = require('../../middlewares/middlewares');

const router = express.Router();

router.post('/', messageController.newMessages);
router.get('/:conversationId', messageController.getMessages);

module.exports = router;
