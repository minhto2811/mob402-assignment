
const express = require('express');
const expressHbs = require('express-handlebars');


const route = require('../routes');
const db = require('../config/db');
const bodyParser = require('body-parser');

const methodOverride = require('method-override');




db.connect();


const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.engine('hbs', expressHbs.engine({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        sum: (a, b) => a + b
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

route(app);

app.listen(port, () => {
    // console.log('##path : ', path.join(__dirname, ''));
    console.log('server run http://localhost:3000/sign-in')
});