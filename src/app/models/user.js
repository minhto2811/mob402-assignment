const mongoose = require('mongoose');

const User = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    username: { type: String, unique: true , require:true},
    password: { type: String,require:true },
    fullname: { type: String },
    type: { type: Number },
    email: { type: String },
    phone: { type: String, minLength: 10, maxLength: 11 },
    address: { type: String },
    date: { type: String },
    image: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);