const express = require('express');
const router = express.Router();
const TaskController = require('../controller/TaskController');
const { requireAuth } = require('../controller/middleware/auth');
const upload = require('../controller/middleware/upload');

// Task routes
router.get('/', requireAuth, TaskController.index);

// Employee submit task (with file upload)
router.post('/submit', requireAuth, upload.single('taskFile'), TaskController.submitTask);

// Admin assign task
router.post('/assign', requireAuth, TaskController.assignTask);

module.exports = router;
