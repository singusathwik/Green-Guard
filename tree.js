const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const treeSchema = new Schema({
    species: { type: String, required: true },
    location: { type: String, required: true }, // Changed to a simple string
    plantedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    healthUpdates: [{
        date: { type: Date, default: Date.now },
        height: Number,
        canopySize: Number,
        healthStatus: { type: String, enum: ['healthy', 'moderate', 'poor'] }
    }],
    // Removed qrCode field
});

module.exports = mongoose.model('Tree', treeSchema);