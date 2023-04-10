const User = require('../models/user');
const Product = require('../models/product');
const Type = require('../models/type');
const Status = require('../models/status');
const { convertleObject } = require('../../util/mongoose');
const user = require('../models/user');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
require('dotenv').config();
const SECRET = process.env.SECRET;
var bcrypt = require('bcrypt');



class ApiController {

    async login(req, res, next) {
        const user = req.body.username;
        const pass = req.body.password;
        try {
            const users = await User.findOne({ username: user });
            if (users == null) {
                res.json({ err: 'Tài khoản hoặc mật khẩu không chính xác!' });
            } else {
                bcrypt.compare(pass, users.password, function (err, result) {
                    if (err) {
                        res.json({ err: 'Xảy ra lỗi khi xác thực tài khoản!' });
                    }
                    if (result) {
                        const token = jwt.sign(users.toJSON(), SECRET);
                        res.json({ user: users, token: token });
                    } else {
                        res.json({ err: 'Tài khoản hoặc mật khẩu không chính xác!' });
                    }
                });

            }
        } catch (error) {
            console.log(error);
        }
    }


    async profile(req, res, next) {
        const token = req.body.token;
        console.log('token get:', token);
        try {
            const decoded = jwt.verify(token, SECRET);
            try {
                const user = await User.findById(decoded._id);
                res.json({ user: user });
            } catch (error) {
                res.json({ err: "Phiên đăng nhập hết hạn!" })
            }

        } catch (error) {
            res.json({ err: "Phiên đăng nhập hết hạn!" })
        }
    }


    updateUser(req, res, next) {
        const user = req.body.user;
        console.log(user);
        console.log(req.params._id);
        User.updateOne({ _id: req.params._id }, user)
            .then(() => { res.json({ msg: "Cập nhật thành công!" }) })
            .catch(err => res.json({ err: "Cập nhật thất bại!" }));
    }



    logout(req, res, next) {

    }

    getUsers(req, res, next) {

    }

    async register(req, res, next) {
        try {
            const user = req.body.user;
            console.log("user nhan dc:", user)
            const valid = await User.findOne({ username: user.username }).exec();
            if (!valid) {
                console.log("1");
                 bcrypt.hash(user.password, 15, function (err, hash) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    user.password = hash;
                    console.log("pass new :", user.password);
                    User.create(user)
                        .then(user => {
                            console.log('User created:', user);
                            res.json({ msg: "Tạo tài khoản thành công" });
                        })
                        .catch(error => {
                            console.error('Error creating user:', error);
                            res.json({ err: "Tạo tài khoản thất bại!" });
                        });
                });

            } else {
                res.json({ err: "Tài khoản đã tồn tại" });
            }
        } catch (error) {
            res.json({ err: "Đã có lỗi xảy ra!" });
        }

    }

    async getProducts(req, res, next) {
        try {
            const products = await Product.find({});
            res.json(products)
        } catch (err) {
            res.josn({ err: "Không tải được dữ liệu!" })
        }
    }

    addProduct(req, res, next) {

    }

    updateProduct(req, res, next) {
        const proUp = req.body.product;
        if (!proUp.price.endsWith('đ')) {
            proUp.price = `${proUp.price} đ`;
        }
        Product.updateOne({ _id: req.params._id }, proUp)
            .then(() => { res.json({ msg: "Cập nhật thành công!" }) })
            .catch(err => res.json({ err: "Cập nhật thất bại!" }));
    }

    deleteProduct(req, res, next) {
        res.json({ id: req.params._id });
        // Product.deleteOne({ _id: req.params._id }, (err, result) => {
        //     if (err) {
        //         res.json({ err: "Xóa thất bại!" })
        //     }
        //     if (result) {
        //         res.json({ msg: "Xóa thành công" })
        //     }
        // });


    }

    detailProduct(req, res, next) {
        const id = req.params._id;
        if (id) {
            Product.findById(id).then((prod) => {
                res.json(prod);
            }).catch((err) => {
                res.jon({ err: "Không tải được dữ liệu sản phẩm!" });
            });
        }
    }


}
module.exports = new ApiController;
