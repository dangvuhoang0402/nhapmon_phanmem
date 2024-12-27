const { populate } = require('../models/LoanTicket');
const ReturnTicket= require('../models/ReturnTicket');
require("express-async-errors");

const createReturnTicket = async (returnTicketData) => {
    const newReturnTicket = await ReturnTicket.create(returnTicketData);
    return await ReturnTicket.findById(newReturnTicket._id)
        .populate({
            path: 'LoanTicketID',
            populate: {
                path: 'Reader'
            }
        })
        .populate('BookDetails.Book');
};
const getReturnTickets = async () => {
    const allReturnTickets = await ReturnTicket.find().populate('LoanTicketID').populate('BookDetails.Book');
    return allReturnTickets;
}

const getReturnTicketById = async (id) => {
    const returnTicket = await ReturnTicket.findById(id);
    if (!returnTicket) {
        throw new Error('ReturnTicket not found');
    }
    return returnTicket;
}

const updateReturnTicket = async (id, returnTicketData) => {
    const updatedReturnTicket = await ReturnTicket.findByIdAndUpdate(id, returnTicketData, { new: true });
    return updatedReturnTicket;
}

const deleteReturnTicket = async (id) => {
    const deletedReturnTicket = await ReturnTicket.findByIdAndDelete(id);
    if (!deletedReturnTicket) {
        throw new Error('ReturnTicket not found');
    }
    return deletedReturnTicket;
}

const getLastReturnTicket = async () => {
    const lastReturnTicket = await ReturnTicket.findOne().sort({ _id: -1 });
    return lastReturnTicket;
}

const getReturnTicketsByMonth = async (month, year) => {
    // Create start and end dates for the month
    const startDate = new Date(year, month - 1, 1); // month-1 because months are 0-based
    const endDate = new Date(year, month, 0); // last day of month

    return await ReturnTicket.find({
        ReturnDate: {
            $gte: startDate,
            $lte: endDate
        }
    })
    .populate({
        path: 'LoanTicketID',
        populate: {
            path: 'Reader'
        }
    })
    .populate('BookDetails.Book')
    .sort({ ReturnDate: 1 });
};


module.exports = {
    createReturnTicket,
    getReturnTickets,
    getReturnTicketById,
    updateReturnTicket,
    deleteReturnTicket,
    getLastReturnTicket,
    getReturnTicketsByMonth
}