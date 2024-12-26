const CustomError = require('../error/CustomError');
const ReportBookReturnRepo = require('../repo/ReportBookReturnRepo');
const ReturnTicketRepo = require('../repo/ReturnTicketRepo');

require('express-async-errors');

const createReportBookReturn = async (reportData) => {
    // Get return tickets for month/year
    const returnTickets = await ReturnTicketRepo.getReturnTicketsByMonth(
        reportData.Month,
        reportData.Year
    );

    console.log('Found return tickets:', returnTickets.length);

    // Process return details
    const returnDetails = [];
    returnTickets.forEach(ticket => {
        if (!ticket.LoanTicketID) {
            console.log('Missing LoanTicketID for ticket:', ticket.ReturnTicketID);
            return;
        }

        ticket.BookDetails.forEach(detail => {
            if (!detail.Book) {
                console.log('Missing Book details');
                return;
            }

            const borrowDate = ticket.LoanTicketID.StartDate;
            const dueDate = ticket.LoanTicketID.DueDate;
            const returnDate = ticket.ReturnDate;

            if (!borrowDate || !dueDate || !returnDate) {
                console.log('Missing date information for ticket:', ticket.ReturnTicketID);
                return;
            }
            
            const dueDays = Math.max(0, 
                Math.floor((returnDate - dueDate) / (1000 * 60 * 60 * 24))
            );

            returnDetails.push({
                BookName: detail.Book.Name,
                BorrowDate: borrowDate,
                DueDays: dueDays
            });
        });
    });

    // Get last report and generate new ID
    const lastReport = await ReportBookReturnRepo.getLastReport();
    const lastNumber = lastReport 
        ? parseInt(lastReport.ReportID.replace('RPR', '')) 
        : 0;
    const ReportID = `RPR${lastNumber + 1}`;

    // Create report with all details
    const newReport = await ReportBookReturnRepo.createReportBookReturn({
        ReportID,
        Month: Number(reportData.Month),
        Year: Number(reportData.Year),
        ReturnDetails: returnDetails,
        TotalBooks: returnDetails.length
    });

    return newReport;
};

const getAllReportBookReturns = async () => {
    console.log('ReportBookReturnService.getAllReportBookReturns() called');
    const reportBookReturns = await ReportBookReturnRepo.getReportBookReturns();
    return reportBookReturns;
}

const getReportBookReturnById = async (id) => {
    console.log('ReportBookReturnService.getReportBookReturnById() called');
    const reportBookReturn = await ReportBookReturnRepo.getReportBookReturnById(id);
    if (!reportBookReturn) {
        throw new CustomError(404, 'ReportBookReturn not found');
    }
    return reportBookReturn;
}

const updateReportBookReturn = async (id, reportBookReturn) => {
    console.log('ReportBookReturnService.updateReportBookReturn() called');
    const updatedReportBookReturn = await ReportBookReturnRepo.updateReportBookReturn(id, reportBookReturn);
    if (!updatedReportBookReturn) {
        throw new CustomError(404, 'ReportBookReturn not found');
    }
    return updatedReportBookReturn;
}

const deleteReportBookReturn = async (id) => {
    console.log('ReportBookReturnService.deleteReportBookReturn() called');
    const deletedReportBookReturn = await ReportBookReturnRepo.deleteReportBookReturn(id);
    if (!deletedReportBookReturn) {
        throw new CustomError(404, 'ReportBookReturn not found');
    }
    return deletedReportBookReturn;
}

module.exports = {
    createReportBookReturn,
    getAllReportBookReturns,
    getReportBookReturnById,
    updateReportBookReturn,
    deleteReportBookReturn
}