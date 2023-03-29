const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    image: {
        type: String,
        default: 'https://img.myloview.com/posters/book-icon-related-to-education-library-book-store-or-knowledge-symbol-isolated-minimal-single-flat-linear-icon-for-application-and-info-graphic-700-200219591.jpg',
    },
    description: {
        type: String,
        default: "No Description is added for this book"
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    // password: {
    //     type: String,
    //     required: true,
    // },
    // genre: [{
    //     type: String,
    // }],
    type: {
        type: String,
        required: false,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;