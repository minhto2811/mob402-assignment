
const usersRouter = require('./users.route');
const productsRouter = require('./products.route');
const siteRouter = require('./site.route');


function route(app) {
    app.use('/users', usersRouter);
    app.use('/products', productsRouter);
    app.use('/', siteRouter);
}

module.exports = route;