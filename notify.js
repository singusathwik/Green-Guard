const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: ['alert', 'reminder', 'achievement', 'update']
    },
    read: { type: Boolean, default: false },
    actionLink: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports
