const express = require(`express`);
const router = express.Router();
const { ordersControllers } = require(`../controllers/orders`);
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/:carts_id`, uploaded.array(), protect, ordersControllers.insert);
router.get(`/`, protect, ordersControllers.getByUsersId);
router.get(`/:id`, protect, ordersControllers.getById);
router.put(`/delivery/:id`, protect, ordersControllers.updateDeliveryById);
router.put(`/done/:id`, protect, ordersControllers.updateDoneById);

module.exports = router;
