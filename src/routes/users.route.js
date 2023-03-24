const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');
const upload = require('../util/saveIMG');



router.post('/', usersController.searchUser);
router.put('/:_id', upload.single('image'), usersController.updateUser);
router.get('/:_id', usersController.detailUser);
router.delete('/:_id', usersController.deleteUser);
router.get('/', usersController.index);

module.exports = router;