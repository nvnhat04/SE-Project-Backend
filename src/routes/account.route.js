const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController.js');

router.post('/signup', accountController.signUp);
//Login
router.post('/login', accountController.login);
module.exports = router;