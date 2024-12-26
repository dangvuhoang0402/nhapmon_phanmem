const moment = require("moment");
const CustomError = require("../error/CustomError");
const LoanTicketRepo = require("../repo/LoanTicketRepo");
const BookService = require("./BookService");
const ReaderService = require("./ReaderService");
const Rule = require("../models/Rule");

require("express-async-errors");

const validateLoanEligibility = async (reader, bookIds, dueDate) => {
    // Check reader card validity
    const rules = await Rule.findOne().sort({ createdAt: -1 }).populate('ReaderRules');
    console.log("reader", reader);
    console.log("reader.Date", reader.Date);
    const cardExpiryDate = moment(reader.Date)
        .add(rules.ReaderRules.CardValidityMonths, 'months');
    if (moment().isAfter(cardExpiryDate)) {
        throw new CustomError('Thẻ độc giả đã hết hạn', 400);
    }

    // Check for overdue books
    const activeLoans = await LoanTicketRepo.getActiveLoansByReader(reader._id);
    const hasOverdue = activeLoans.some(loan => 
        moment().isAfter(moment(loan.DueDate)) && !loan.ReturnDate
    );
    if (hasOverdue) {
        throw new CustomError('Độc giả có sách quá hạn chưa trả', 400);
    }

    // Check total books in 4-day period
    const fourDaysAgo = moment().subtract(4, 'days');
    const recentLoans = activeLoans.filter(loan => 
        moment(loan.StartDate).isAfter(fourDaysAgo) && !loan.ReturnDate
    );

    const currentBorrowedBooks = recentLoans.reduce((total, loan) => total + loan.Books.length, 0);
    const totalBooks = currentBorrowedBooks + bookIds.length;

    if (totalBooks > 5) {
        throw new CustomError('Độc giả không thể mượn quá 5 cuốn sách trong vòng 4 ngày', 400);
    }

    // Validate books existence and availability
    const validatedBooks = await Promise.all(
        bookIds.map(id => BookService.getBookById(id))
    );

    if (validatedBooks.some(book => !book)) {
        throw new CustomError('Một số sách không tồn tại', 400);
    }

    validatedBooks.forEach(book => {
        if (book.Status !== 1) {
            throw new CustomError(`Sách ${book.BookID} không khả dụng`, 400);
        }
    });

    return validatedBooks;
};

const createLoanTicket = async (loanData) => {
    const { Reader: readerId, Books, StartDate, DueDate } = loanData;
    
    // Validate loan eligibility
    const reader = await ReaderService.getReaderById(readerId);
    if (!reader) {
        throw new CustomError('Độc giả không tồn tại', 400);
    }

    // Validate loan eligibility
    await validateLoanEligibility(reader, Books, DueDate);

    // Get last loan ticket and generate new ID
    const lastLoanTicket = await LoanTicketRepo.getLastLoanTicket();
    const lastNumber = lastLoanTicket 
        ? parseInt(lastLoanTicket.LoanTicketID.replace('LT', '')) 
        : 0;
    const LoanTicketID = `LT${lastNumber + 1}`;
    
    // Create loan ticket
    const loanTicket = await LoanTicketRepo.createLoanTicket({
        LoanTicketID,
        Reader: readerId,
        Books,
        StartDate,
        DueDate,
        Status: 1 // Active
    });

    // Update book status to unavailable (0)
    for (const bookId of Books) {
        await BookService.updateBookStatus(bookId, 0);
    }

    return loanTicket;
};

const getAllLoanTickets = async () => {
    console.log("LoanTicketService.getAllLoanTickets() called");
    const loanTickets = await LoanTicketRepo.getLoanTickets();
    return loanTickets;
}

const getLoanTicketById = async (id) => {
    console.log("LoanTicketService.getLoanTicketById() called");
    const loanTicket = await LoanTicketRepo.getLoanTicketById(id);
    if (!loanTicket) {
        throw new CustomError(404, "LoanTicket not found");
    }
    return loanTicket;
}

const updateLoanTicket = async (id, loanTicket) => {
    console.log("LoanTicketService.updateLoanTicket() called");
    const updatedLoanTicket = await LoanTicketRepo.updateLoanTicket(id, loanTicket);
    if (!updatedLoanTicket) {
        throw new CustomError(404, "LoanTicket not found");
    }
    return updatedLoanTicket;
}

const deleteLoanTicket = async (id) => {
    console.log("LoanTicketService.deleteLoanTicket() called");
    const deletedLoanTicket = await LoanTicketRepo.deleteLoanTicket(id);
    if (!deletedLoanTicket) {
        throw new CustomError(404, "LoanTicket not found");
    }
    return deletedLoanTicket;
}

const getActiveLoansTickets = async () => {
    const activeLoanTickets = await LoanTicketRepo.getActiveLoanTickets();
    return activeLoanTickets;
}

module.exports = {
    createLoanTicket,
    getAllLoanTickets,
    getLoanTicketById,
    updateLoanTicket,
    deleteLoanTicket,
    validateLoanEligibility,
    getActiveLoansTickets
}