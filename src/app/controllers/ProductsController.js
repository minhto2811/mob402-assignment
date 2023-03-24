const Product = require('../models/product');
const { getArrayObjects } = require('../../util/mongoose');
const { getSingleObject } = require('../../util/mongoose');
class ProductsController {
    index(req, res, next) {

        Product.find({})
            .then(products => {
                res.render('products', { layout: 'home', products: getArrayObjects(products) });
            })
            .catch(next);
    }

    async detailProduct(req, res, next) {
        console.log('id user: ', req.params._id);
        try {
            const product = await Product.findById(req.params._id).exec();
            console.log(product);
            res.render('detail-product', { layout: 'home', product: getSingleObject(product) });
        } catch (err) {
            console.error(err);
            res.send(err);
        }
    }

    addProduct(req, res, next) {
        res.render('add-product', { layout: 'home' });
    }

    store(req, res, next) {
        res.json(req.body);
    }
}

module.exports = new ProductsController;
