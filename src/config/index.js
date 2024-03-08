const mongoose = require('mongoose');

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://nvnhat4304:04032004@cluster0.pxfnimw.mongodb.net/user';

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true // Removing the useCreateIndex option
        });
        console.log('Connected successfully to MongoDB Atlas');
        return 'done';
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed:', error);
        return 'error';
    }
}

module.exports = { connect };
