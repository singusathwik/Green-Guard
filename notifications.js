const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['threat', 'event', 'resource', 'user'],
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    likeStatus: {
        type: String,
        enum: ['none', 'like', 'dislike'],
        default: 'none',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Notification', notificationSchema);