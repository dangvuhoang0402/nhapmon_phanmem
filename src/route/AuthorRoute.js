const authorController = require('../controllers/AuthorController');
const express = require('express');

const router = express.Router();

router.get('/', authorController.getAllAuthors);
router.post('/', authorController.createAuthor);

router
    .route('/:id')
    .delete(authorController.deleteAuthor)
    .put(authorController.updateAuthor)
    .get(authorController.getAuthorById);
module.exports = router;

