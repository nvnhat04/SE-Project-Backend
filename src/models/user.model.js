const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, default: '' },
    image: { type: String, default: '' },
    gender: {type: String, default: null},
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    likeMovie: {type: Array, default: [] },
    avatar: {type: String, default: ''},
    create: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', User);