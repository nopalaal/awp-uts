const express = require('express');
const router = express.Router();
const MediaPartnerController = require('../controller/MediaPartnerController');
const { requireAuth } = require('../controller/middleware/auth');

// List media partner
router.get('/', requireAuth, MediaPartnerController.index);

module.exports = router;
