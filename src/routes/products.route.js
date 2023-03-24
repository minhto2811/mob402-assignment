const express = require('express');
const router = express.Router();
const productsController = require('../app/controllers/ProductsController');
const upload = require('../util/saveIMG');

router.post('/store', upload.single('image'), productsController.store);
router.get('/add-product', productsController.addProduct);
router.get('/:_id', productsController.detailProduct);
router.put('/:_id', upload.single('image'), productsController.update);
router.delete('/:_id', productsController.delete);
router.get('/', productsController.index);


module.exports = router;