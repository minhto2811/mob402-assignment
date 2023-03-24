const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    code: { type: String, minLength: 4 },
    name: { type: String, minLength: 5 },
    price: { type: String, minLength: 5 },
    image: { type: String, minLength: 15 },
    color: { type: String, minLength: 1 },
    type: { type: String, minLength: 1 },
});

module.exports = mongoose.model('Product', Product);