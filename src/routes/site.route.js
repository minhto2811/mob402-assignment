const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const upload = require('../util/saveIMG');
const mdw = require('../util/midleware/checkUser.midleware');

router.post('/check-account', siteController.checkOut);
router.get('/home', siteController.home);
router.get('/logout', siteController.logOut);
router.get('/sign-in', siteController.signIn);
router.get('/register', siteController.register);
router.post('/registerCheckout', upload.single('avatar'), siteController.registercheckout);
router.get('/forgot-password', siteController.forgotPassword);


module.exports = router;