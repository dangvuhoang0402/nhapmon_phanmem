const bookController = require('../controllers/BookController');
const express = require('express');

const router = express.Router();

router.get('/', bookController.renderBookList);
router.get('/all', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.get('/new', bookController.getNewBooks);

router
    .route('/:id')
    .delete(bookController.deleteBook)
    .put(bookController.updateBook)
    .get(bookController.getBookById);
module.exports = router;