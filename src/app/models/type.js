const mongoose = require('mongoose');

const Type = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    type: { type: String },
});

module.exports = mongoose.model('Type', Type);