const readerController = require('../controllers/ReaderController');
const express = require('express');

const router = express.Router();

router.get('/', readerController.getAllReaders);
router.post('/', readerController.createReader);
router.get('/new', readerController.getNewReaders);

router
    .route('/:id')
    .delete(readerController.deleteReader)
    .put(readerController.updateReader)
    .get(readerController.getReaderById);
module.exports = router;