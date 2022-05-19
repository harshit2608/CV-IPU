const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const Conversation = require('../../models/chatsystem/conversationModel');

exports.startConversation = catchAsync(async (req, res, next) => {
    // const newConversation = new Conversation({
    //     members: [req.user.id, req.body.receiverId],
    // });

    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    // console.log(req.user.id);
    const savedConversation = await newConversation.save();
    res.status(200).json({
        status: 'success',
        data: { savedConversation },
    });
    // return next(new AppError(`Internal Server Error`, 500));
});

exports.getConversation = catchAsync(async (req, res, next) => {
    const conversationIds = await Conversation.find({
        members: { $in: [req.params.userId] },
    });

    if (!conversationIds) {
        return next(new AppError(`Cannot find that user`, 500));
    }

    res.status(200).json({
        status: 'success',
        result: conversationIds.length,
        data: { conversationIds },
    });
});
