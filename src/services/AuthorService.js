const CustomError = require("../error/CustomError");
const AuthorRepo = require("../repo/AuthorRepo");

require("express-async-errors");
const createAuthor = async (author) => {
    console.log("AuthorService.createAuthor() called");
    const newAuthor = await AuthorRepo.createAuthor(author);
    return newAuthor;
}

const getAllAuthors = async () => {
    console.log("AuthorService.getAllAuthors() called");
    const authors = await AuthorRepo.getAllAuthors();
    console.log("Authors: ", authors);
    return authors;
}

const getAuthorById = async (id) => {
    console.log("AuthorService.getAuthorById() called");
    const author = await AuthorRepo.getAuthorById(id);
    if (!author) {
        throw new CustomError(404, "Author not found");
    }
    return author;
}

const updateAuthor = async (id, author) => {
    console.log("AuthorService.updateAuthor() called");
    const updatedAuthor = await AuthorRepo.updateAuthor(id, author);
    if (!updatedAuthor) {
        throw new CustomError(404, "Author not found");
    }
    return updatedAuthor;
}

const deleteAuthor = async (id) => {
    console.log("AuthorService.deleteAuthor() called");
    const deletedAuthor = await AuthorRepo.deleteAuthor(id);
    if (!deletedAuthor) {
        throw new CustomError(404, "Author not found");
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
