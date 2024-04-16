const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    user_email: { type: String, required: true },
    movie_id: { type: String, required: true },
    text: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);