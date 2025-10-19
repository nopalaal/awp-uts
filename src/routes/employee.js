const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/EmployeeController');
const { requireAuth, requireRole } = require('../controller/middleware/auth');

router.get('/', requireAuth, requireRole(['admin']), EmployeeController.index);

module.exports = router;
