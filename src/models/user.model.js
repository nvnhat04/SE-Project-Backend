const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    name: { type: String, default: '' },
    image: { type: String, default: '' },
    gender: {type: String, default: null},
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    favoriteFilm: {type: Array, default: [] },
    avatar: {type: String, default: ''},
    create: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', user);