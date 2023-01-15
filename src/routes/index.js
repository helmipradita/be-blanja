const express = require('express');
const router = express.Router();
const userControllers = require('./users');
const categoriesControllers = require('./categories');
const productsControllers = require('./products');
const cartsControllers = require('./carts');
const ordersControllers = require('./orders');

router.use('/users', userControllers);
router.use('/categories', categoriesControllers);
router.use('/products', productsControllers);
router.use('/carts', cartsControllers);
router.use('/orders', ordersControllers);

module.exports = router;
