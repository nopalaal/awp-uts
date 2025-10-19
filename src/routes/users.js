const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const { requireAuth, requireRole } = require('../controller/middleware/auth');

router.get('/', requireAuth, requireRole(['admin']), UserController.index);

module.exports = router;
