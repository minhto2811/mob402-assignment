exports.check_type_user = (req, res, next) => {
    if (req.session.user.type == 0) {
        next();
    } else {
        res.send('<h1>Không có quyền truy cập trang này</h1>')
    }
}

exports.check_user = (req, res, next) => {
    if (req.session.user != null) {
        next();
    } else {
        let msg = 'Denied permision';
        res.send('<h1>Không có quyền truy cập trang này</h1>')
    }
}

