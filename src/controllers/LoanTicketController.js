const LoanTicketService = require('../services/LoanTicketService');
const ReaderService = require('../services/ReaderService');
const BookService = require('../services/BookService');

const getAllLoanTickets = async (req, res, next) => {
    console.log('getAllLoanTickets');
    const loanTickets = await LoanTicketService.getAllLoanTickets();
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: loanTickets 
    };
    res.render('pages/loanticket_list', {loanTickets });
    next();
}

const createLoanTicket = async (req, res) => {
    try {
        const loanTicket = await LoanTicketService.createLoanTicket(req.body);
        res.render('pages/loanticket_success_create', { loanTicket });
    } catch (error) {
        res.render('pages/loanticket_failed_create', { error });
    }
};

const deleteLoanTicket = async (req, res, next) => {
    console.log('deleteLoanTicket');
    const loanTicket = await LoanTicketService.deleteLoanTicket(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: loanTicket 
    };
    next();
}

const updateLoanTicket = async (req, res, next) => {
    console.log('updateLoanTicket');
    const loanTicket = await LoanTicketService.updateLoanTicket(req.params.id, req.body);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: loanTicket 
    };
    next();
}

const getLoanTicketById = async (req, res, next) => {
    console.log('getLoanTicketById');
    const loanTicket = await LoanTicketService.getLoanTicketById(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: loanTicket 
    };
    next();
}

const getNewLoanTickets = async (req, res, next) => {
    const readers = await ReaderService.getAllReaders();
    const books = await BookService.getAllBooks();
    res.render('pages/loanticket_create', { readers, books });
}

module.exports = {
    getAllLoanTickets,
    createLoanTicket,
    deleteLoanTicket,
    updateLoanTicket,
    getLoanTicketById,
    getNewLoanTickets,
};