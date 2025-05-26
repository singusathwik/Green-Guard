const Edu = require('../models/edu');

exports.getEduResources = async (req, res) => {
    try {
        const resources = await Edu.find();
        res.status(200).json({ success: true, data: resources });
    } catch (error) {
        console.error('Error fetching educational resources:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};