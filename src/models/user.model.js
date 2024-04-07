const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    username: { type: String, default: ''},
    name: { type: String, default: 'Guest' },
    image: { type: String, default: '' },
    gender: {type: String, default: null},
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    favoriteFilm: {type: Array, default: [] },
    avatar: {type: String, default: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1712469242~exp=1712469842~hmac=6b15115efaa98402692474397df117f78b8c20cf08abcbbad2ca4ddb75d95d51'},
    create: { type: Date, default: Date.now },
});
user.pre('save', function(next) {
    // Check if the email field is modified or not
    if (this.isModified('email')) {
        // Extract username from email before the "@" symbol
        const username = this.email.substring(0, this.email.indexOf('@'));
        this.username = username;
    }
    next();
});
module.exports = mongoose.model('User', user);