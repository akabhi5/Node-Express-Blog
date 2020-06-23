const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    content: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', userSchema);
