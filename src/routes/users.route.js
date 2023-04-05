const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');
const upload = require('../util/saveIMG');
const mdw = require('../util/midleware/checkUser.midleware');


router.post('/', usersController.searchUser);
router.put('/:_id', upload.single('image'), usersController.updateUser);
router.get('/:_id', usersController.detailUser);
router.delete('/:_id', usersController.deleteUser);
router.get('/', mdw.check_type_user, usersController.index);

module.exports = router;