const Book = require('../models/Book');

require("express-async-errors");

const createBook = async (bookData) => {
    const newBook = await Book.create(bookData);
    return newBook.populate('Author');
}

const getBooks = async () => {
    const allBooks = await Book.find().populate('Author');
    return allBooks;
}

const getBookById = async (id) => {
    const book = await Book.findById(id);
    if (!book) {
        throw new Error('Book not found');
    }
    return book;
}

const updateBook = async (id, bookData) => {
    const updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true });
    return updatedBook;
}

const deleteBook = async (id) => {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
        throw new Error('Book not found');
    }
    return deletedBook;
}

const getLastBook = async () => {
    const lastBook = await Book.findOne().sort({ _id: -1 });
    return lastBook;
}

const updateBookStatus = async (id, status) => {
    const updatedBook = await Book.findByIdAndUpdate({
        _id: id
    }, {
        Status: status
    });
    return updatedBook;
}

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    getLastBook,
    updateBookStatus
}