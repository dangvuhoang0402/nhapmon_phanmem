const Author= require('../models/Author');
require("express-async-errors");

const createAuthor = async (authorData) => {
    const newAuthor = await Author.create(authorData);
    return newAuthor;
}

const getAllAuthors = async () => {
    const allAuthors = await Author.find().populate('Books');
    return allAuthors;
}

const getAuthorById = async (id) => {
    const author = await Author.findById(id);
    if (!author) {
        throw new Error('Author not found');
    }
    return author;
}

const updateAuthor = async (id, authorData) => {
    const updatedAuthor = await Author.findByIdAndUpdate(id, authorData, { new: true });
    return updatedAuthor;
}

const deleteAuthor = async (id) => {
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
        throw new Error('Author not found');
    }
    return deletedAuthor;
}

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
}