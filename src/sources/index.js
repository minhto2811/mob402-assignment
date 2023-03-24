// import express from 'express';
// import expressHbs from 'express-handlebars';

const express = require('express');
const expressHbs = require('express-handlebars');
const multer = require('multer');

const route = require('../routes');
const db = require('../config/db');


db.connect();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../public/image'));
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png';
//         cb(null, file.fieldname + '-' + uniqueSuffix);
//     }
// })

// const upload = multer({ storage: storage });


const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')))

app.engine('hbs', expressHbs.engine({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

route(app);

app.listen(port, () => {
    // console.log('##path : ', path.join(__dirname, ''));
    console.log('server run http://localhost:3000/sign-in')
});