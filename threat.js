const mongoose = require('mongoose');

const threatSchema = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    coordinates: { type: [Number], required: true },
    reportedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Investigating', 'Resolved'], default: 'Pending' },
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
    reportedBy: { type: String, required: true },
    image: { type: String },
});

module.exports = mongoose.model('Threat', threatSchema);