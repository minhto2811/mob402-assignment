const User = require('../models/user');


class SiteController {
    home(req, res) {
        res.render('home', { layout: 'home' });
    }
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



}

module.exports = new SiteController;