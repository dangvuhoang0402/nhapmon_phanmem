const loanticketController = require('../controllers/LoanTicketController');
const express = require('express');

const router = express.Router();

router.get('/', loanticketController.getAllLoanTickets);
router.post('/', loanticketController.createLoanTicket);
router.get('/new', loanticketController.getNewLoanTickets);

router
    .route('/:id')
    .delete(loanticketController.deleteLoanTicket)
    .put(loanticketController.updateLoanTicket)
    .get(loanticketController.getLoanTicketById);
module.exports = router;