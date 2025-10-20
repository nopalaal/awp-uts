const express = require('express');
const router = express.Router();
const MediaPartnerController = require('../controller/MediaPartnerController');
const { requireAuth } = require('../controller/middleware/auth');

// List media partner
router.get('/', requireAuth, MediaPartnerController.index);
// Create media partner
router.post('/create', requireAuth, MediaPartnerController.create);
// Delete media partner
router.post('/delete/:id', requireAuth, MediaPartnerController.delete);
// Form edit media partner (AJAX)
router.get('/edit/:id', requireAuth, MediaPartnerController.formEdit);
// Update media partner
router.post('/edit/:id', requireAuth, MediaPartnerController.update);

module.exports = router;
