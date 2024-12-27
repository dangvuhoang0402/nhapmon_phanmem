const ReturnTicketRepo=require('../repo/ReturnTicketRepo');
const BookRepo=require('../repo/BookRepo');
const LoanTicketRepo=require('../repo/LoanTicketRepo');
const ReaderRepo=require('../repo/ReaderRepo');
require("express-async-errors");

const createReturnTicket = async (returnTicketData) => {
    // Generate ReturnTicketID
    const lastReturnTicket = await ReturnTicketRepo.getLastReturnTicket();
    const lastNumber = lastReturnTicket 
        ? parseInt(lastReturnTicket.ReturnTicketID.replace('RT', '')) 
        : 0;
    const ReturnTicketID = `RT${(lastNumber + 1).toString().padStart(5, '0')}`;

    // Get loan ticket and validate
    const loanTicket = await LoanTicketRepo.getLoanTicketById(returnTicketData.LoanTicketID);
    if (!loanTicket) {
        throw new Error('Phiếu mượn không tồn tại');
    }

    // Process returned books
    const returnedBooks = returnTicketData.ReturnedBooks || [];
    const bookDetails = [];
    let totalPenalty = 0;

    // Create book details array and calculate penalties
    for (const bookId of returnedBooks) {
        const bookData = returnTicketData.BookDetails[bookId];
        if (bookData) {
            bookDetails.push({
                Book: bookId,
                Penalty: Number(bookData.Penalty) || 0,
                Notes: bookData.Notes || ''
            });
            totalPenalty += Number(bookData.Penalty) || 0;
        }
    }

    // Create return ticket
    const returnTicket = {
        ReturnTicketID,
        LoanTicketID: returnTicketData.LoanTicketID,
        BookDetails: bookDetails,
        ReturnDate: new Date(),
        TotalPenalty: totalPenalty
    };

    // Save return ticket
    const savedReturnTicket = await ReturnTicketRepo.createReturnTicket(returnTicket);

    // Update book statuses to available
    for (const detail of bookDetails) {
        await BookRepo.updateBookStatus(detail.Book, 1);
    }

    // Update reader's pending penalty
    if (totalPenalty > 0) {
        await ReaderRepo.updateReaderPenalty(loanTicket.Reader, totalPenalty);
    }

    return savedReturnTicket;
};

const getAllReturnTickets = async () => {
    const returnTickets = await ReturnTicketRepo.getReturnTickets();
    return returnTickets;
}

const getReturnTicketById = async (id) => {
    const returnTicket = await ReturnTicketRepo.getReturnTicketById(id);
    return returnTicket;
}

const updateReturnTicket = async (id, returnTicketData) => {
    const updatedReturnTicket = await ReturnTicketRepo.updateReturnTicket(id, returnTicketData);
    return updatedReturnTicket;
}

const deleteReturnTicket = async (id) => {
    const deletedReturnTicket = await ReturnTicketRepo.deleteReturnTicket(id);
    return deletedReturnTicket;
}

module.exports = {
    createReturnTicket,
    getAllReturnTickets,
    getReturnTicketById,
    updateReturnTicket,
    deleteReturnTicket
}