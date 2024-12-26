const AuthorService = require('../services/AuthorService');

const getAllAuthors = async (req, res, next) => {
    console.log('getAllAuthors');
    const authors = await AuthorService.getAllAuthors();
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: authors 
    };
    next();
}

const createAuthor = async (req, res, next) => {
    console.log('createAuthor');
    const author = await AuthorService.createAuthor(req.body);
    req.responseData = {
        status: 201, 
        message: 'Success',
        data: author 
    };
    next();
}

const deleteAuthor = async (req, res, next) => {
    console.log('deleteAuthor');
    const author = await AuthorService.deleteAuthor(req.params.id);
    req.responseData = {
        status: 200,
        message: 'Success',
        data: author
    };
    next();
}

const updateAuthor = async (req, res) => {
    console.log('updateAuthor');
    const author = await AuthorService.updateAuthor(req.params.id, req.body);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: author 
    };
    next();
}

const getAuthorById = async (req, res) => {
    console.log('getAuthorById');
    const author = await AuthorService.getAuthorById(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: author 
    };
    next();
}

module.exports = {
    getAllAuthors,
    createAuthor,
    deleteAuthor,
    updateAuthor,
    getAuthorById
}
