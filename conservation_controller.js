const Conservation = require('../models/conservation');

// Create a new conservation event
exports.createConservation = async (req, res) => {
    try {
        const conservation = new Conservation(req.body);
        await conservation.save();
        res.status(201).json({ success: true, data: conservation });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get all conservation events
exports.getConservations = async (req, res) => {
    try {
        const conservations = await Conservation.find()
            .populate('organizer', 'username email')
            .populate('participants', 'username email');
        res.json({ success: true, data: conservations });
    } catch (err) {
        console.error("Error in getConservations:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

