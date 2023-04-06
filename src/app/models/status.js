const mongoose = require('mongoose');

const Status = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    type: { type: String },
});

module.exports = mongoose.model('Status', Status);