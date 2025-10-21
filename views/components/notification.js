// Notification system for header
document.addEventListener('DOMContentLoaded', function() {
  const notificationData = {
    notifications: [],
    unreadCount: 0,
    loading: false,

    async loadNotifications() {
      try {
        this.loading = true;
        const response = await fetch('/api/notifications');
        const data = await response.json();
        
        if (data.success) {
          this.notifications = data.notifications;
          this.unreadCount = data.unreadCount;
          this.renderNotifications();
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        this.loading = false;
      }
    },

    async markAsRead(id) {
      try {
        await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
        await this.loadNotifications();
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    },

    getTimeAgo(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const seconds = Math.floor((now - date) / 1000);
      
      if (seconds < 60) return 'Just now';
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return minutes + ' min ago';
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
      const days = Math.floor(hours / 24);
      return days + ' day' + (days > 1 ? 's' : '') + ' ago';
    },

    getIcon(type) {
      if (type === 'task') {
        return `<svg class="fill-blue-600 dark:fill-blue-400" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 3H5C4.44772 3 4 3.44772 4 4V16C4 16.5523 4.44772 17 5 17H15C15.5523 17 16 16.5523 16 16V4C16 3.44772 15.5523 3 15 3ZM7 7H13V9H7V7ZM7 11H13V13H7V11Z"/>
        </svg>`;
      } else if (type === 'event') {
        return `<svg class="fill-green-600 dark:fill-green-400" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM4 8V16H16V8H4Z"/>
        </svg>`;
      }
      return '';
    },

    renderNotifications() {
      const notifList = document.getElementById('notification-list-dynamic');
      const notifBadge = document.getElementById('notification-badge');
      
      if (!notifList) return;

      // Update badge
      if (notifBadge) {
        if (this.unreadCount > 0) {
          notifBadge.classList.remove('hidden');
          notifBadge.classList.add('flex');
        } else {
          notifBadge.classList.remove('flex');
          notifBadge.classList.add('hidden');
        }
      }

      // Render notifications
      if (this.notifications.length === 0) {
        notifList.innerHTML = `
          <li class="p-6 text-center">
            <p class="text-gray-500 dark:text-gray-400 text-sm">No notifications</p>
          </li>
        `;
        return;
      }

      notifList.innerHTML = this.notifications.map(notif => `
        <li>
          <a
            class="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5 cursor-pointer ${notif.isRead ? '' : 'bg-blue-50 dark:bg-blue-900/10'}"
            href="${notif.type === 'task' ? '/tasks' : '#'}"
            onclick="notificationData.markAsRead(${notif.idNotification}); return true;"
          >
            <span class="relative z-1 block h-10 w-full max-w-10 rounded-full flex items-center justify-center bg-${notif.type === 'task' ? 'blue' : 'green'}-100 dark:bg-${notif.type === 'task' ? 'blue' : 'green'}-500/20">
              ${this.getIcon(notif.type)}
            </span>

            <span class="block flex-1">
              <span class="text-theme-sm mb-1.5 block text-gray-700 dark:text-gray-300">
                <span class="font-semibold text-gray-900 dark:text-white">${notif.title}</span>
              </span>
              <span class="text-theme-xs block text-gray-600 dark:text-gray-400 mb-2">${notif.message}</span>

              <span class="text-theme-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <span>${notif.type === 'task' ? 'Task' : 'Event'}</span>
                <span class="h-1 w-1 rounded-full bg-gray-400"></span>
                <span>${this.getTimeAgo(notif.createdAt)}</span>
              </span>
            </span>
          </a>
        </li>
      `).join('');
    }
  };

  // Load notifications initially
  notificationData.loadNotifications();

  // Refresh every 30 seconds
  setInterval(() => {
    notificationData.loadNotifications();
  }, 30000);

  // Make notificationData available globally
  window.notificationData = notificationData;
});
