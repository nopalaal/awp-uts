const { notification: Notification, user: User } = require('../models');

const NotificationController = {
  // Get user notifications
  getNotifications: async (req, res) => {
    try {
      const userId = req.session.user.idUser;
      
      const notifications = await Notification.findAll({
        where: { idUser: userId },
        order: [['createdAt', 'DESC']],
        limit: 10
      });

      const unreadCount = await Notification.count({
        where: { idUser: userId, isRead: false }
      });

      res.json({
        success: true,
        notifications,
        unreadCount
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch notifications'
      });
    }
  },

  // Mark notification as read
  markAsRead: async (req, res) => {
    try {
      const { idNotification } = req.params;
      const userId = req.session.user.idUser;

      await Notification.update(
        { isRead: true },
        {
          where: {
            idNotification: idNotification,
            idUser: userId
          }
        }
      );

      res.json({ success: true });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to mark notification as read'
      });
    }
  },

  // Mark all notifications as read
  markAllAsRead: async (req, res) => {
    try {
      const userId = req.session.user.idUser;

      await Notification.update(
        { isRead: true },
        {
          where: {
            idUser: userId,
            isRead: false
          }
        }
      );

      res.json({ success: true });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to mark all notifications as read'
      });
    }
  },

  // Create notification (helper function)
  createNotification: async (userId, title, message, type, relatedId = null) => {
    try {
      await Notification.create({
        idUser: userId,
        title,
        message,
        type,
        relatedId
      });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }
};

module.exports = NotificationController;
