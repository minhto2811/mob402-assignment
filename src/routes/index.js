
const usersRouter = require('./users.route');
const productsRouter = require('./products.route');
const siteRouter = require('./site.route');
const apiRoute = require('./api.route');


function route(app) {
    app.use('/api', apiRoute);
    app.use('/users', usersRouter);
    app.use('/products', productsRouter);
    app.use('/', siteRouter);
}

module.exports = route;