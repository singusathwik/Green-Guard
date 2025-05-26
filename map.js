const mongoose = require('mongoose'); // <-- Add this line
const Schema = mongoose.Schema;

const fMapSchema = new Schema({
    type: { type: String, enum: ['flora', 'fauna', 'threat'], required: true },
    species: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    description: String,
    images: [String],
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FloraMap', fMapSchema);