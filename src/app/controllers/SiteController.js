const session = require('express-session');
const { convertleObject } = require('../../util/mongoose');
const User = require('../models/user');

class SiteController {

    signIn(req, res) {
        res.render('sign-in');
    }
    forgotPassword(req, res) {
        res.render('forgot-password');
    }
    register(req, res) {
        res.render('register');
    }

    registercheckout(req, res, next) {
        var object = req.body;
        object.image = `/image/${req.file.originalname}`;
        object.type = 1;
        const user = new User(object);
        user.save().then(() => res.redirect('/sign-in'))
            .catch(next);
    }


    async checkOut(req, res, next) {
        const user = req.body.username;
        const pass = req.body.password;
        await User.findOne({ username: user, password: pass })
            .then(users => {
                if (users === null) {
                    res.render('sign-in', { layout: 'main', err: "Tài khoản hoặc mật khẩu không chính xác!" });
                } else {
                    req.session.user = users;
                    res.redirect('/home');
                }

            }).catch(next);

    }


    home(req, res, next) {
        if (req.session.user != null) {
            res.render('home', { layout: 'home', userM: req.session.user, type_eq_0: req.session.user.type === 0 });
        } else {
            res.redirect('/sign-in');
        }
    }

    logOut(req, res, next) {
        if (req.session.user != null) {
            req.session.user = null;
            req.session.destroy();
        }
        res.redirect('/sign-in');
    }






}

module.exports = new SiteController;