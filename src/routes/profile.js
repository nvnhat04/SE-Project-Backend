const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.use('/', userController.index);
module.exports = router;