const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController.js');
const tokenMiddleware = require('../middlewares/token.middleware.js');

router.post('/signup', accountController.signUp);
//Login
router.post('/login', accountController.login);

router.get('/:username', accountController.getDetails);
router.get('/:username/favorite',accountController.getFavorite);
module.exports = router;