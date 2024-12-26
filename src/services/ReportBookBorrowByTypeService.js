const CustomError = require("../error/CustomError");
const ReportBookBorrowByTypeRepo = require("../repo/ReportBookBorrowByTypeRepo");
const LoanTicketRepo = require("../repo/LoanTicketRepo");

require("express-async-errors");

const createReportBookBorrowByType = async (reportData) => {
    // Get loan tickets for month/year
    const loanTickets = await LoanTicketRepo.getLoanTicketsByMonth(
        reportData.Month,
        reportData.Year
    );
    console.log("loanTickets", loanTickets);

    // Count borrows by type
    const typeStats = {
        'A': 0,
        'B': 0,
        'C': 0
    };

    loanTickets.forEach(ticket => {
        ticket.Books.forEach(book => {
            typeStats[book.Type]++;
        });
    });

    // Calculate total and percentages
    const totalBorrows = Object.values(typeStats).reduce((a, b) => a + b, 0);
    
    // Create stats array with safe percentage calculation
    const BookTypeStats = Object.entries(typeStats).map(([type, count], index) => ({
        Number: index + 1,
        BookType: type,
        TotalBorrows: Number(count),
        PercentageOfTotal: totalBorrows === 0 ? 0 : Number(((count / totalBorrows) * 100).toFixed(2))
    }));

    // Get last report ID
    const lastReport = await ReportBookBorrowByTypeRepo.getLastReport();
    const lastNumber = lastReport 
        ? parseInt(lastReport.ReportID.replace('RPB', '')) 
        : 0;
    const ReportID = `RPB${lastNumber + 1}`;

    // Create report
    const newReport = await ReportBookBorrowByTypeRepo.createReportBookBorrowByType({
        ReportID,
        Month: Number(reportData.Month),
        Year: Number(reportData.Year),
        BookTypeStats,
        TotalBorrowsAllTypes: Number(totalBorrows)
    });

    return newReport;
};

const getAllReportBookBorrowByTypes = async () => {
    console.log("ReportBookBorrowByTypeService.getAllReportBookBorrowByTypes() called");
    const reportBookBorrowByTypes = await ReportBookBorrowByTypeRepo.getReportBookBorrowByTypes();
    return reportBookBorrowByTypes;
}

const getReportBookBorrowByTypeById = async (id) => {
    console.log("ReportBookBorrowByTypeService.getReportBookBorrowByTypeById() called");
    const reportBookBorrowByType = await ReportBookBorrowByTypeRepo.getReportBookBorrowByTypeById(id);
    if (!reportBookBorrowByType) {
        throw new CustomError(404, "ReportBookBorrowByType not found");
    }
    return reportBookBorrowByType;
}

const updateReportBookBorrowByType = async (id, reportBookBorrowByType) => {
    console.log("ReportBookBorrowByTypeService.updateReportBookBorrowByType() called");
    const updatedReportBookBorrowByType = await ReportBookBorrowByTypeRepo.updateReportBookBorrowByType(id, reportBookBorrowByType);
    if (!updatedReportBookBorrowByType) {
        throw new CustomError(404, "ReportBookBorrowByType not found");
    }
    return updatedReportBookBorrowByType;
}

const deleteReportBookBorrowByType = async (id) => {
    console.log("ReportBookBorrowByTypeService.deleteReportBookBorrowByType() called");
    const deletedReportBookBorrowByType = await ReportBookBorrowByTypeRepo.deleteReportBookBorrowByType(id);
    if (!deletedReportBookBorrowByType) {
        throw new CustomError(404, "ReportBookBorrowByType not found");
    }
    return deletedReportBookBorrowByType;
}

module.exports = {
    createReportBookBorrowByType,
    getAllReportBookBorrowByTypes,
    getReportBookBorrowByTypeById,
    updateReportBookBorrowByType,
    deleteReportBookBorrowByType
}