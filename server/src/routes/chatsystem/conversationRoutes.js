const express = require('express');

const conversationController = require('../../controllers/chatsystem/conversationController');
const { protect } = require('../../middlewares/middlewares');

const router = express.Router();

router.post('/', conversationController.startConversation);
router.get('/:userId', conversationController.getConversation);

module.exports = router;
