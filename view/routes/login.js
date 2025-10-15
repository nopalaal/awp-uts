const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const { requireGuest } = require('../middleware/auth');

router.get('/login', requireGuest, AuthController.showLogin);
router.post('/login', requireGuest, AuthController.processLogin);

router.get('/register', requireGuest, AuthController.showRegister);
router.post('/register', requireGuest, AuthController.processRegister);

router.post('/logout', AuthController.logout);
router.get('/logout', AuthController.logout);

module.exports = router;