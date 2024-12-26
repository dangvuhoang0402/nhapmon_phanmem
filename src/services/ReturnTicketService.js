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
    const ReturnTicketID = `RT${lastNumber + 1}`;

    // Get loan ticket and its books
    const loanTicket = await LoanTicketRepo.getLoanTicketById(returnTicketData.LoanTicketID);
    
    // Process selected books for return
    const bookDetails = returnTicketData.BookDetails || [];
    const selectedBooks = bookDetails
        .filter(detail => detail && detail.Book)
        .map(detail => ({
            Book: detail.Book,
            Penalty: detail.Penalty || 0,
            Notes: detail.Notes || ''
        }));

    // Calculate total penalty
    const totalPenalty = selectedBooks.reduce((sum, book) => sum + (book.Penalty || 0), 0);

    // Check if all books are being returned
    const isFullReturn = selectedBooks.length === loanTicket.Books.length;

    // Create return ticket
    const newReturnTicket = await ReturnTicketRepo.createReturnTicket({
        ReturnTicketID,
        LoanTicketID: returnTicketData.LoanTicketID,
        BookDetails: selectedBooks,
        ReturnDate: returnTicketData.ReturnDate || new Date(),
        TotalPenalty: totalPenalty
    });

    // Update loan ticket status if all books returned
    if (isFullReturn) {
        await LoanTicketRepo.updateLoanTicketStatus(returnTicketData.LoanTicketID, 0);
    } else {
        // Remove returned books from loan ticket
        const remainingBooks = loanTicket.Books.filter(book => 
            !selectedBooks.some(selected => selected.Book.toString() === book._id.toString())
        );
        await LoanTicketRepo.updateLoanTicketBooks(returnTicketData.LoanTicketID, remainingBooks);
    }

    // Update book statuses
    for (const detail of selectedBooks) {
        await BookRepo.updateBookStatus(detail.Book, 1);
    }
    const reader = loanTicket.Reader;
    await ReaderRepo.updateReaderPenalty(reader, totalPenalty);
    return newReturnTicket;
};

const getAllReturnTickets = async () => {
    const returnTickets = await ReturnTicketRepo.getAllReturnTickets();
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