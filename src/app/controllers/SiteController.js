const session = require('express-session');
const { convertleObject } = require('../../util/mongoose');
const User = require('../models/user');
var bcrypt = require('bcrypt');

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

    async registercheckout(req, res, next) {
        var object = req.body;
        object.image = `/image/${req.file.originalname}`;
        object.type = 1;
        try {
            await bcrypt.hash(object.password, 15, function (err, hash) {
                object.password = hash;
                const user = new User(object);
                user.save().then(() => res.redirect('/sign-in'))
                    .catch(next);
            });
        } catch (error) {
            res.send(error);
        }



    }


    async checkOut(req, res, next) {
        const user = req.body.username;
        const pass = req.body.password;
        try {
            const users = await User.findOne({ username: user });
            if (users == null) {
                console.log("null");
                res.render('sign-in', { layout: 'main', err: "Tài khoản hoặc mật khẩu không chính xác!", username: req.body.username, password: req.body.password });
            } else {
                console.log("user dang nhap", users);
                try {
                    await bcrypt.compare(pass, users.password, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            req.session.user = users;
                            res.redirect('/home');
                        } else {
                            res.render('sign-in', { layout: 'main', err: "Tài khoản hoặc mật khẩu không chính xác!", username: req.body.username, password: req.body.password });
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }


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