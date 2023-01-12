const express = require('express');
const router = express.Router();
const userControllers = require('./users');
const categoriesControllers = require('./categories');
const productsControllers = require('./products');

router.use('/users', userControllers);
router.use('/categories', categoriesControllers);
router.use('/products', productsControllers);

module.exports = router;
