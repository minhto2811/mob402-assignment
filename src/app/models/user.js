const mongoose = require('mongoose');

const User = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    username: { type: String, minLength: 5 },
    password: { type: String, minLength: 5 },
    fullname: { type: String, minLength: 5 },
    type: { type: Number },
    email: { type: String },
    phone: { type: String, minLength: 10, maxLength: 11 },
    address: { type: String },
    date: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);