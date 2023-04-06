const express = require('express');
const router = express.Router();
const productsController = require('../app/controllers/ProductsController');
const upload = require('../util/saveIMG');
const mdw = require('../util/midleware/checkUser.midleware');

router.post('/store', mdw.check_type_user, upload.single('image'), productsController.store);
router.get('/add-product', mdw.check_type_user, productsController.addProduct);
router.get('/:_id', mdw.check_type_user, productsController.detailProduct);
router.put('/:_id', mdw.check_type_user, upload.single('image'), productsController.update);
router.delete('/:_id', mdw.check_type_user, productsController.delete);
router.get('/', mdw.check_user, productsController.index);


module.exports = router;