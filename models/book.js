const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    copies: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
});

const Book = mongoose.model('Book' , bookSchema);
module.exports = Book;