const ReportBookReturn= require('../models/ReportBookReturn');
require("express-async-errors");

const createReportBookReturn = async (reportBookReturnData) => {
    const newReportBookReturn = await ReportBookReturn.create(reportBookReturnData);
    return newReportBookReturn;
}

const getReportBookReturns = async () => {
    const allReportBookReturns = await ReportBookReturn.find().populate('loanTicket');
    return allReportBookReturns;
}

const getReportBookReturnById = async (id) => {
    const reportBookReturn = await ReportBook.findById(id);
    if (!reportBookReturn) {
        throw new Error('ReportBookReturn not found');
    }
    return reportBookReturn;
}

const updateReportBookReturn = async (id, reportBookReturnData) => {
    const updatedReportBookReturn = await ReportBookReturn.findByIdAndUpdate(id, reportBookReturnData, { new: true });
    return updatedReportBookReturn;
}

const deleteReportBookReturn = async (id) => {
    const deletedReportBookReturn = await ReportBookReturn.findByIdAndDelete(id);
    if (!deletedReportBookReturn) {
        throw new Error('ReportBookReturn not found');
    }
    return deletedReportBookReturn;
}

const getLastReport = async () => {
    const lastReport = await ReportBookReturn.findOne().sort({ ReportID: -1 });
    return lastReport;
}

module.exports = {
    createReportBookReturn,
    getReportBookReturns,
    getReportBookReturnById,
    updateReportBookReturn,
    deleteReportBookReturn,
    getLastReport
}