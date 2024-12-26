const LoanTicket= require('../models/LoanTicket');
require("express-async-errors");

const createLoanTicket = async (loanTicketData) => {
    const newLoanTicket = await LoanTicket.create(loanTicketData);
    return await LoanTicket.findById(newLoanTicket._id)
        .populate('Books')
        .populate('Reader');
};

const getLoanTickets = async () => {
    const allLoanTickets = await LoanTicket.find().populate('Books').populate('Reader');;
    return allLoanTickets;
}

const getLoanTicketById = async (id
) => {
    const loanTicket = await LoanTicket.findById(id);
    if (!loanTicket) {
        throw new Error('LoanTicket not found');
    }
    return loanTicket;
}

const updateLoanTicket = async (id, loanTicketData) => {
    const updatedLoanTicket = await LoanTicket.findByIdAndUpdate(id, loanTicketData, { new: true });
    return updatedLoanTicket;
}

const deleteLoanTicket = async (id) => {
    const deletedLoanTicket = await LoanTicket.findByIdAndDelete(id);
    if (!deletedLoanTicket) {
        throw new Error('LoanTicket not found');
    }
    return deletedLoanTicket;
}

const getActiveLoansByReader = async (readerId) => {
    return await LoanTicket.find({
        Reader: readerId,
        ReturnDate: null,
        Status: 1
    })
    .populate('Books')
    .populate('Reader');
};

const getLastLoanTicket = async () => {
    return await LoanTicket.findOne()
        .sort({ LoanTicketID: -1 });
};

const updateLoanTicketStatus = async (id, status) => {
    return await LoanTicket.findByIdAndUpdate(id, { Status: status }, { new: true });
}

const getActiveLoanTickets = async () => {
    return await LoanTicket.find({ 
        Status: 1,
        ReturnDate: null 
    })
    .populate('Reader')
    .populate('Books')
    .sort({ StartDate: -1 });
};

const updateLoanTicketBooks = async (id, books) => {
    return await LoanTicket.findByIdAndUpdate(id, { Books: books }, { new: true });
}

const getLoanTicketsByMonth = async (month, year) => {
    // Create start and end dates for the month
    const startDate = new Date(year, month - 1, 1); // month-1 because months are 0-based
    const endDate = new Date(year, month, 0); // last day of month
    
    return await LoanTicket.find({
        StartDate: {
            $gte: startDate,
            $lte: endDate
        }
    })
    .populate('Books')
    .populate('Reader')
    .sort({ StartDate: 1 });
};

module.exports = {
    createLoanTicket,
    getLoanTickets,
    getLoanTicketById,
    updateLoanTicket,
    deleteLoanTicket,
    getActiveLoansByReader,
    getLastLoanTicket,
    updateLoanTicketStatus,
    getActiveLoanTickets,
    updateLoanTicketBooks,
    getLoanTicketsByMonth
}