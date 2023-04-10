const { config } = require('dotenv');
require('dotenv').config();
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');


exports.check_token = (req, res, next) => {
    console.log('token: ', req.body.token);
    try {
        const decoded = jwt.verify(req.body.token, SECRET);
        if (decoded.type == 0) {
            next();
        }
    } catch (error) {
        res.json({ err: "Phiên đăng nhập hết hạn! 111" })
    }
}


exports.check_token_id = (req, res, next) => {
    console.log('token: ', req.body.token);
    try {
        const decoded = jwt.verify(req.body.token, SECRET);
        if ((req.params._id === decoded._id) || (decoded.type == 0)) {
            next();
        }
    } catch (error) {
        res.json({ err: "Phiên đăng nhập hết hạn! 111" })
    }
}