const returnticketController = require('../controllers/ReturnTicketController');
const express = require('express');

const router = express.Router();

router.get('/', returnticketController.getAllReturnTickets);
router.post('/', returnticketController.createReturnTicket);
router.get('/new', returnticketController.getNewReturnTickets);

router
    .route('/:id')
    .delete(returnticketController.deleteReturnTicket)
    .put(returnticketController.updateReturnTicket)
    .get(returnticketController.getReturnTicketById);

module.exports = router;