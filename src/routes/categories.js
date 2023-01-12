const express = require(`express`);
const router = express.Router();
const { categoriesControllers } = require(`../controllers/categories`);
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
let multer = require('multer');
let uploaded = multer();

router.post(`/`, uploaded.array(), protect, categoriesControllers.insert);
router.get(`/all`, categoriesControllers.getAll);
router.get(`/`, protect, categoriesControllers.getByUsersId);
router.put(`/:id`, uploaded.array(), protect, categoriesControllers.edit);
router.delete(`/:id`, protect, categoriesControllers.delete);

module.exports = router;
