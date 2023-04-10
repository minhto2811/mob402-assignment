
const express = require('express');
const expressHbs = require('express-handlebars');
require('dotenv').config();

const route = require('../routes');
const db = require('../config/db');
const bodyParser = require('body-parser');

const methodOverride = require('method-override');


const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/mob402_assignment',
  collection: 'mySessions'
});


db.connect();



const app = express();
const port = process.env.PORT || 3000;
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
    sum: (a, b) => a + b,
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
  secret: process.env.KEY_SESSION,
  resave: false,
  saveUninitialized: false,
  store: store
}));

route(app);

app.listen(port, () => {
  // console.log('##path : ', path.join(__dirname, ''));
  console.log('server run http://localhost:3000/home')
});