const ReturnTicketService = require('../services/ReturnTicketService');
const LoanTicketService = require('../services/LoanTicketService');

const getAllReturnTickets = async (req, res, next) => {
    console.log('getAllReturnTickets');
    const returnTickets = await ReturnTicketService.getAllReturnTickets();
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: returnTickets 
    };
    next();
}

const createReturnTicket = async (req, res, next) => {
    console.log('createReturnTicket');
    const returnTicket = await ReturnTicketService.createReturnTicket(req.body);
    req.responseData = {
        status: 201, 
        message: 'Success',
        data: returnTicket 
    };
    res.render('pages/returnticket_success_create', { returnTicket: returnTicket });
    next();
}

const deleteReturnTicket = async (req, res, next) => {
    console.log('deleteReturnTicket');
    const returnTicket = await ReturnTicketService.deleteReturnTicket(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: returnTicket 
    };
    next();
}

const updateReturnTicket = async (req, res, next) => {
    console.log('updateReturnTicket');
    const returnTicket = await ReturnTicketService.updateReturnTicket(req.params.id, req.body);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: returnTicket 
    };
    next();
}

const getReturnTicketById = async (req, res, next) => {
    console.log('getReturnTicketById');
    const returnTicket = await ReturnTicketService.getReturnTicketById(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: returnTicket 
    };
    next();
}

const getNewReturnTickets = async (req, res, next) => {
    console.log('getNewReturnTickets');
    const loanTickets = await LoanTicketService.getActiveLoansTickets();
    console.log(loanTickets);
    res.render('pages/returnticket_create', { loanTickets: loanTickets });
    next();
}

module.exports = {
    getAllReturnTickets,
    createReturnTicket,
    deleteReturnTicket,
    updateReturnTicket,
    getReturnTicketById,
    getNewReturnTickets
}