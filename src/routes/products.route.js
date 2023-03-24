const express = require('express');
const router = express.Router();
const productsController = require('../app/controllers/ProductsController');

router.post('/store', productsController.store);
router.get('/add-product', productsController.addProduct);
router.get('/:_id', productsController.detailProduct);
router.get('/', productsController.index);


module.exports = router;