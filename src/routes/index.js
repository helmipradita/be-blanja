const express = require('express');
const router = express.Router();
const userControllers = require('./users');
const categoriesControllers = require('./categories');

router.use('/users', userControllers);
router.use('/categories', categoriesControllers);

module.exports = router;
