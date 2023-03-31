const Product = require('../models/product');
const Type = require('../models/type');
const { convertleObject } = require('../../util/mongoose');

const dataT = [];


Type.find({})
    .then(products => {
        for (let index = 0; index < convertleObject(products).length; index++) {
            dataT.push(convertleObject(products)[index].type);
        }
    })
    .catch(err => console.log(err));



class ProductsController {
    index(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('products', { layout: 'home', products: convertleObject(products), userM: req.session.user, type_eq_0: req.session.user.type == 0 });
            })
            .catch(next);
    }

    async detailProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params._id).exec();
            const objectFinded = convertleObject(product);

            const selectedOptionObject = dataT.reduce(
                (acc, option) => ({
                    ...acc,
                    [option]: option === objectFinded.type,
                }),
                {}
            );
            res.render('detail-product', { layout: 'home', product: objectFinded, selectedOption: selectedOptionObject, userM: req.session.user, type_eq_0: req.session.user.type === 0 });
        } catch (err) {
            res.send(err);
        }
    }

    addProduct(req, res, next) {
        const selectedOptionObject = dataT.reduce(
            (acc, option) => ({
                ...acc,
                [option]: option === 'Áo',
            }),
            {}
        );
        res.render('add-product', { layout: 'home', selectedOption: selectedOptionObject, userM: req.session.user, type_eq_0: req.session.user.type === 0 });
    }

    store(req, res, next) {
        const formData = req.body;
        formData.image = `/image/${req.file.originalname}`
        formData.price = `${req.body.price} đ`
        const product = new Product(formData);
        product.save()
            .then(() => res.redirect('/products'))
            .catch(next);
    }

    update(req, res, next) {
        const formData = req.body;
        if (!formData.price.endsWith('đ')) {
            formData.price = `${req.body.price} đ`;
        }
        if (req.file !== undefined && req.file !== null) {
            formData.image = `/image/${req.file.originalname}`;
        } else {
            formData.image = formData.old;
        }
        delete formData.old;
        Product.updateOne({ _id: req.params._id }, formData)
            .then(() => res.redirect('/products'))
            .catch(next);
    }

    delete(req, res, next) {
        Product.deleteOne({ _id: req.params._id })
            .then(() => res.redirect('/products'))
            .catch(next);
    }
}

module.exports = new ProductsController;
