const express = require('express');
const router = express.Router();
const apiController = require('../app/controllers/ApiController');
const upload = require('../util/saveIMG');
const mdw = require('../util/midleware/checkUser.midleware');
const { check_token, check_token_id } = require('../util/midleware/checkToken.midleware');

//user
router.post('/users/profile', apiController.profile);
router.post('/users/login', apiController.login);
router.post('/users/update/:_id', check_token_id, apiController.updateUser);
router.post('/users/delete/:_id', check_token_id, apiController.deleteUser);
router.post('/users/register', apiController.register);
router.post('/users', check_token, apiController.getUsers);

router.get('/users/logout', apiController.logout);





//product
router.get('/products', apiController.getProducts);
router.post('/products/:_id', check_token, apiController.detailProduct);
router.post('/products/update/:_id', check_token, apiController.updateProduct);
router.post('/products/delete/:_id', check_token, apiController.deleteProduct);


router.post('/products', apiController.addProduct);



module.exports = router;