const penaltyreceiptController = require('../controllers/PenaltyReceiptController');
const express = require('express');

const router = express.Router();

router.get('/', penaltyreceiptController.getAllPenaltyReceipts);
router.post('/', penaltyreceiptController.createPenaltyReceipt);
router.get('/new', penaltyreceiptController.getNewPenaltyReceipts);

router
    .route('/:id')
    .delete(penaltyreceiptController.deletePenaltyReceipt)
    .put(penaltyreceiptController.updatePenaltyReceipt)
    .get(penaltyreceiptController.getPenaltyReceiptById);

module.exports = router;