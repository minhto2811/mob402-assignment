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
        console.log('id user: ', req.params._id);
        try {
            const user = await User.findById(req.params._id).exec();
            console.log(user);
            res.render('detail-user', { layout: 'home', user:getSingleObject(user) });
        } catch (err) {
            console.error(err);
            res.send(err);
        }
    }
}

module.exports = new UserController;