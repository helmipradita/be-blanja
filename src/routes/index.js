const express = require('express');
const router = express.Router();
const userControllers = require('./users');

router.use('/users', userControllers);

module.exports = router;
