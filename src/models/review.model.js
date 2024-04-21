const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    username: { type: String, required: true },
    movieId: { type: String, required: true },
    text: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);