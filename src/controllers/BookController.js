const BookService = require('../services/BookService');
const AuthorService = require('../services/AuthorService');
const Rule = require('../models/Rule');

const getAllBooks = async (req, res, next) => {
    console.log('getAllBooks');
    const books = await BookService.getAllBooks();  
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: books 
    };
    next();
}

const createBook = async (req, res, next) => {
    console.log('createBook');
    const book = await BookService.createBook(req.body);
    req.responseData = {
        status: 201, 
        message: 'Success',
        data: book 
    };
    res.render('pages/book_success_created', { book: book });
    next();
}

const renderBookList = async (req, res) => {
    console.log('renderBookList');
    const books = await BookService.getAllBooks();
    res.render('pages/book_list', { books: books });
}

const deleteBook = async (req, res, next) => {
    console.log('deleteBook');
    const book = await BookService.deleteBook(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: book 
    };
    next();
}

const updateBook = async (req, res, next) => {
    console.log('updateBook');
    const book = await BookService.updateBook(req.params.id, req.body);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: book 
    };
    next();
}

const getBookById = async (req, res, next) => {
    console.log('getBookById');
    const book = await BookService.getBookById(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: book 
    };
    res.render('pages/book_detail', { book: book });
    next();
}

const getNewBooks = async (req, res, next) => {
    const authors = await AuthorService.getAllAuthors();
    const rules = await Rule.findOne().populate('BookRules');
    res.render('pages/book_create', { authors: authors , rules: rules });
}

module.exports = {
    getAllBooks,
    createBook,
    deleteBook,
    updateBook,
    getBookById,
    getNewBooks,
    renderBookList
}