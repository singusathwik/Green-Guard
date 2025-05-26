const Notification = require('../models/notifications'); // Changed from 'notification' to 'notifications'

exports.getNotifications = async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log('Fetching notifications for user:', userId);
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        console.log('Notifications found:', notifications);
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateLikeStatus = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const { likeStatus } = req.body;
        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { likeStatus },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        console.error('Error updating like status:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};