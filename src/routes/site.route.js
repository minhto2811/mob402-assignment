const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');


router.get('/home', siteController.home);
router.get('/sign-in', siteController.signIn);
router.get('/register', siteController.register);
router.get('/forgot-password', siteController.forgotPassword);


module.exports = router;