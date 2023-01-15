const express = require(`express`);
const router = express.Router();
const { cartsControllers } = require(`../controllers/carts`);
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(
  `/:products_id`,
  uploaded.array(),
  protect,
  cartsControllers.insert
);
router.get(`/`, protect, cartsControllers.getByUsersId);
router.delete(`/:id`, protect, cartsControllers.delete);

module.exports = router;
