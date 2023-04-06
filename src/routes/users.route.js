const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');
const upload = require('../util/saveIMG');
const mdw = require('../util/midleware/checkUser.midleware');


router.post('/', mdw.check_user,mdw.check_type_user, usersController.searchUser);
router.put('/:_id', mdw.check_user, upload.single('image'), usersController.updateUser);
router.get('/:_id', mdw.check_user, usersController.detailUser);
router.delete('/:_id',mdw.check_user, mdw.check_type_user, usersController.deleteUser);
router.get('/', mdw.check_user,mdw.check_type_user, usersController.index);

module.exports = router;