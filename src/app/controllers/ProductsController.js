const Product = require('../models/product');
const Type = require('../models/type');
const { getArrayObjects } = require('../../util/mongoose');
const { getSingleObject } = require('../../util/mongoose');

const dataT = [];


Type.find({})
    .then(products => {
        for (let index = 0; index < getArrayObjects(products).length; index++) {
            dataT.push(getArrayObjects(products)[index].type);
        }
    })
    .catch(err => console.log(err));



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
            const objectFinded = getSingleObject(product);

            const selectedOptionObject = dataT.reduce(
                (acc, option) => ({
                    ...acc,
                    [option]: option === objectFinded.type,
                }),
                {}
            );
            res.render('detail-product', { layout: 'home', product: objectFinded, selectedOption: selectedOptionObject, });
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
        res.render('add-product', { layout: 'home', selectedOption: selectedOptionObject });
    }

    store(req, res, next) {
        const formData = req.body;
        formData.image = `/image/product/${req.file.originalname}`
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
            formData.image = `/image/product/${req.file.originalname}`
          } else {
            formData.image = formData.old
          }
        delete formData.old;
        const id_product = req.path.replace('/', '');
        Product.updateOne({ _id: id_product }, formData)
            .then(() => res.redirect('/products'))
            .catch(next);
    }

    delete(req, res, next) {
        const id_product = req.path.replace('/', '');
        Product.deleteOne({ _id: id_product })
            .then(() => res.redirect('/products'))
            .catch(next);
    }
}

module.exports = new ProductsController;
