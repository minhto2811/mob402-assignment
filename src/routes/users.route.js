const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');

router.get('/:_id', usersController.detailUser);
router.get('/', usersController.index);

module.exports = router;