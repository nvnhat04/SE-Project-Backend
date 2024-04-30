const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    username: { type: String, default: ''},
    name: { type: String, default: 'Guest' },
    gender: {type: String, default: null},
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    favoriteFilm: {type: Array, default: [] },
    avatar: {type: String, default: 'D:\Github\Movie-Web\server\public\no_image.jpg'},
    create: { type: Date, default: Date.now },
    admin: { type: Boolean, default: false },
});

user.pre('save', function(next) {
    if (this.isModified('email')) {
        const username = this.email.substring(0, this.email.indexOf('@'));
        this.username = username;
    }
    next();
});
module.exports = mongoose.model('User', user);