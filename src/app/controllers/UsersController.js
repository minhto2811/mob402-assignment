const User = require('../models/user');

const { convertleObject } = require('../../util/mongoose');

var allUser;

class UserController {
    index(req, res, next) {
        User.find({})
            .then(users => {
                allUser = convertleObject(users);
                res.render('users', { layout: 'home', users: allUser });
            })
            .catch(next);
    }

    async detailUser(req, res, next) {
        const id = req.params._id;
        try {
            const user = await User.findById(id).exec();
            console.log(convertleObject(user));
            res.render('detail-user', { layout: 'home', user: convertleObject(user) });
        } catch (err) {
            console.error(err);
            res.send(err);
        }
    }

    updateUser(req, res, next) {
        const formData = req.body;
        if (req.file !== undefined && req.file !== null) {
            formData.image = `/image/${req.file.originalname}`;
        } else {
            console.log('nullsssssssssssss')
            formData.image = formData.old;
        }
        delete formData.old;
        User.updateOne({ _id: req.params._id }, formData)
            .then(() => res.redirect('/users'))
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
                    res.render('users', { layout: 'home', users: allUser });
                } else {
                    res.render('users', { layout: 'home', users: convertleObject(users), valueSearch: req.body.email });
                }


            }).catch(next);

    }

}

module.exports = new UserController;