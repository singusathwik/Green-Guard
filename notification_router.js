// routes/notification_router.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification_controller');

router.get('/', notificationController.getNotifications);
router.put('/:notificationId/read', notificationController.markAsRead);
router.put('/:notificationId/like', notificationController.updateLikeStatus);

module.exports = router;
