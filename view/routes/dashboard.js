const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');
const { requireAuth, requireRole } = require('../middleware/auth');