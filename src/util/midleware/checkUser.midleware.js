exports.check_type_user = (req, res, next) => {
    if (req.session.user.type == 0) {
        next();
    } else {
        res.redirect('/home');
    }
}

exports.check_user = (req, res, next) => {
    if (req.session.user != null) {
        next();
    } else {
        res.redirect('/sign-in');
    }
}

