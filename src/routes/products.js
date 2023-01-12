const express = require(`express`);
const router = express.Router();
const { productsControllers } = require(`../controllers/products`);
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

//seller
router.post(`/`, upload.single('photo'), protect, productsControllers.insert);
router.get(`/`, protect, productsControllers.getBySeller);
router.get(`/sold-out`, protect, productsControllers.getSold);
router.get(`/archived`, protect, productsControllers.getArchived);
router.put(`/:id`, upload.single('photo'), protect, productsControllers.edit);
router.put(
  `/archived/:id`,
  uploaded.array(),
  protect,
  productsControllers.putArchived
);

// //guest
router.get(`/all`, productsControllers.getAll);
router.get(`/all/:id`, productsControllers.getById);

module.exports = router;
