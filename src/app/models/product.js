const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    code: { type: String },
    name: { type: String },
    price: { type: String },
    image: { type: String },
    color: { type: String },
    type: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', Product);