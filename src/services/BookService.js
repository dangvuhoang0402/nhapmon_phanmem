const CustomError = require("../error/CustomError");
const BookRepo = require("../repo/BookRepo");

require("express-async-errors");

const createBook = async (book) => {
    console.log("BookService.createBook() called");
    const lastBook = await BookRepo.getLastBook();
    const lastNumber = lastBook && lastBook.BookID 
        ? parseInt(lastBook.BookID.replace("BOOK", "")) 
        : 0;
    const BookID = `BOOK${lastNumber + 1}`;
    book.BookID = BookID;
    console.log("book", book);
    const newBook = await BookRepo.createBook(book);
    return newBook;
}

const getAllBooks = async () => {
    console.log("BookService.getAllBooks() called");
    const books = await BookRepo.getBooks();
    return books;
}

const getBookById = async (id) => {
    console.log("BookService.getBookById() called");
    const book = await BookRepo.getBookById(id);
    if (!book) {
        throw new CustomError(404, "Book not found");
    }
    return book;
}

const updateBook = async (id, book) => {
    console.log("BookService.updateBook() called");
    const updatedBook = await BookRepo.updateBook(id, book);
    if (!updatedBook) {
        throw new CustomError(404, "Book not found");
    }
    return updatedBook;
}

const deleteBook = async (id) => {
    console.log("BookService.deleteBook() called");
    const deletedBook = await BookRepo.deleteBook(id);
    if (!deletedBook) {
        throw new CustomError(404, "Book not found");
    }
    return deletedBook;
}

const updateBookStatus = async (id, status) => {
    console.log("BookService.UpdateBookStatus() called");
    const updatedBook = await BookRepo.updateBookStatus(id, status);
    if (!updatedBook) {
        throw new CustomError(404, "Book not found");
    }
    return updatedBook;
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookStatus
}