const express = require('express');
const router = express.Router();
const NotificationController = require('../controller/NotificationController');
const { requireAuth } = require('../controller/middleware/auth');

// Get user notifications
router.get('/api/notifications', requireAuth, NotificationController.getNotifications);

// Mark notification as read
router.put('/api/notifications/:idNotification/read', requireAuth, NotificationController.markAsRead);

// Mark all notifications as read
router.put('/api/notifications/read-all', requireAuth, NotificationController.markAllAsRead);

module.exports = router;
