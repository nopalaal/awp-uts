const express = require('express');
const router = express.Router();
const DashboardController = require('../controller/DashboardController');
const { requireAuth, requireRole } = require('../controller/middleware/auth');

// Dashboard routes
router.get('/', requireAuth, DashboardController.index);

// Users management (admin only)
// router.get('/users', requireAuth, requireRole(['admin']), DashboardController.users);

// API Chart Data
router.get('/api/chart/:type', requireAuth, DashboardController.getChartData);

module.exports = router;