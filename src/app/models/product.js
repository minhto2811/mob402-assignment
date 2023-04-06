const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    code: { type: String, require },
    name: { type: String, require },
    price: { type: String, require },
    image: { type: String, require },
    color: { type: String, require },
    type: { type: String, require },
    sold: { type: Number, require },
    status: { type: String, require },
    describe: { type: String, require }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', Product);