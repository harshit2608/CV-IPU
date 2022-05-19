const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const Message = require('../../models/chatsystem/messageModel');

exports.newMessages = catchAsync(async (req, res, next) => {
    // const newMessage = new Message({
    //     text: req.body.text,
    //     senderId: req.user.id,
    //     conversationId: req.body.conversationId,
    // });

    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    if (!newMessage) {
        return next(new AppError(`Unable to save messages to database`, 500));
    }

    res.status(200).json({
        status: 'success',
        savedMessage,
    });
});

exports.getMessages = catchAsync(async (req, res, next) => {
    const messages = await Message.find({
        conversationId: req.params.conversationId,
    });
    if (!messages) {
        return next(
            new AppError(
                `No messages Found for this conversation id ${req.params.conversationId}`,
                500
            )
        );
    }

    res.status(200).json({
        status: 'success',
        result: messages.length,
        messages,
    });
});
