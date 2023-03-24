const User = require('../models/user');

const { getArrayObjects } = require('../../util/mongoose');
const { getSingleObject } = require('../../util/mongoose');

class UserController {
    index(req, res, next) {
        User.find({})
            .then(users => {
                res.render('users', { layout: 'home', users: getArrayObjects(users) });
            })
            .catch(next);
    }

    async detailUser(req, res, next) {
        const id = req.params._id;
        try {
            const user = await User.findById(id).exec();
            console.log(getSingleObject(user));
            res.render('detail-user', { layout: 'home', user: getSingleObject(user) });
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
        const query = req.body.email.toString();
        await User.findOne({ email: query })
            .then(users => {
                console.log(getSingleObject(users));
                res.render('users', { layout: 'home', users: getSingleObject(users) });
            }).catch(next);
    }

}

module.exports = new UserController;