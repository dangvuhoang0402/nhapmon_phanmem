const ReportBookReturnController = require('../controllers/ReportBookReturnController');
const express = require('express');

const router = express.Router();

router.get('/', ReportBookReturnController.getAllReportBookReturns);
router.post('/', ReportBookReturnController.createReportBookReturn);
router.get('/new', ReportBookReturnController.getNewReportBookReturns);

router
    .route('/:id')
    .delete(ReportBookReturnController.deleteReportBookReturn)
    .put(ReportBookReturnController.updateReportBookReturn)
    .get(ReportBookReturnController.getReportBookReturnById);
module.exports = router;