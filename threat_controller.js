const Threat = require('../models/threat');

exports.getThreats = async (req, res) => {
    try {
        const threats = await Threat.find();
        res.json({ success: true, data: threats });
    } catch (error) {
        console.error('Error fetching threats:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.createThreat = async (req, res) => {
    try {
        if (!Array.isArray(coordinates) || coordinates.length !== 2) {
            return res.status(400).json({ success: false, message: 'Coordinates must be an array of two numbers' });
        }
        const { type, description, location, coordinates, severity, reportedBy, image } = req.body;
        const threat = new Threat({
            type,
            description,
            location,
            coordinates,
            reportedAt: new Date(),
            status: 'Pending',
            severity,
            reportedBy,
            image,
        });
        const savedThreat = await threat.save();
        res.status(201).json({ success: true, data: savedThreat });
    } catch (error) {
        console.error('Error creating threat:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};