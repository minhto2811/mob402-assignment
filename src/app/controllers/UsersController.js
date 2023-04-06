const User = require('../models/user');

const { convertleObject } = require('../../util/mongoose');

const siteController = require('./SiteController');

var allUser;

class UserController {
    index(req, res, next) {
        User.find({})
            .then(users => {
                allUser = convertleObject(users);
                res.render('users', { layout: 'home', users: allUser, userM: req.session.user, type_eq_0: req.session.user.type === 0 });
            })
            .catch(next);
    }

    async detailUser(req, res, next) {
        const id = req.params._id;
        try {
            const user = await User.findById(id).exec();
            console.log(req.session.user);
            res.render('detail-user', { layout: 'home', user: convertleObject(user), userM: req.session.user, type_eq_0: req.session.user.type === 0 });
        } catch (err) {
            console.error(err);
            res.send(err);
        }
    }

    updateUser(req, res, next) {
        const formData = req.body;
        const convertType = parseInt(formData.type);
        formData.type = convertType;
        const id = req.params._id;
        if (req.file !== undefined && req.file !== null) {
            formData.image = `/image/${req.file.originalname}`;
        } else {
            formData.image = formData.old;
        }
        delete formData.old;
        User.updateOne({ _id: id }, formData)
            .then(() => {
                if (formData.type == 0) {
                    formData._id = id;
                    req.session.user = formData;
                    res.redirect('/users/' + id);
                } else {
                    res.redirect('/users');
                }

            })
            .catch(next);
    }

    deleteUser(req, res, next) {
        User.deleteOne({ _id: req.params._id })
            .then(() => res.redirect('/users'))
            .catch(next);
    }

    async searchUser(req, res, next) {
        const query = req.body.email;
        await User.find({ email: query })
            .then(users => {
                if (users.length === 0) {
                    res.render('users', { layout: 'home', users: allUser, userM: req.session.user, type_eq_0: req.session.user.type === 0 });
                } else {
                    res.render('users', { layout: 'home', users: convertleObject(users), valueSearch: req.body.email, userM: req.session.user, type_eq_0: req.session.user.type === 0 });
                }
            }).catch(next);

    }



}





module.exports = new UserController;