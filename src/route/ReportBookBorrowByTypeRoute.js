const reportBookBorrowByTypeController = require('../controllers/ReportBookBorrowByTypeController');
const express = require('express');

const router = express.Router();

router.get('/', reportBookBorrowByTypeController.getAllReportBookBorrowByTypes);
router.post('/', reportBookBorrowByTypeController.createReportBookBorrowByType);
router.get('/new', reportBookBorrowByTypeController.getNewReportBookBorrowByTypes);

router
    .route('/:id')
    .delete(reportBookBorrowByTypeController.deleteReportBookBorrowByType)
    .put(reportBookBorrowByTypeController.updateReportBookBorrowByType)
    .get(reportBookBorrowByTypeController.getReportBookBorrowByTypeById);
module.exports = router;

