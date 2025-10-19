const express = require('express');
const router = express.Router();
const CalendarController = require('../controller/CalendarController');
const { requireAuth } = require('../controller/middleware/auth');

// Calendar routes
router.get('/', requireAuth, CalendarController.index);

// API endpoint for events
router.get('/api/events', requireAuth, CalendarController.getEvents);

module.exports = router;
