const ReportBookBorrowByType= require('../models/ReportBookBorrowByType');
require("express-async-errors");

const createReportBookBorrowByType = async (reportBookBorrowByTypeData) => {
    const newReportBookBorrowByType = await ReportBookBorrowByType.create(reportBookBorrowByTypeData);
    return newReportBookBorrowByType;
}

const getReportBookBorrowByTypes = async () => {
    const allReportBookBorrowByTypes = await ReportBookBorrowByType.find().populate('book');
    return allReportBookBorrowByTypes;
}

const getReportBookBorrowByTypeById = async (id) => {
    const reportBookBorrowByType = await ReportBookBorrowByType.findById(id);
    if (!reportBookBorrowByType) {
        throw new Error('ReportBookBorrowByType not found');
    }
    return reportBookBorrowByType;
}

const updateReportBookBorrowByType = async (id, reportBookBorrowByTypeData) => {
    const updatedReportBookBorrowByType = await ReportBookBorrowByType.findByIdAndUpdate(id, reportBookBorrowByTypeData, { new: true });
    return updatedReportBookBorrowByType;
}

const deleteReportBookBorrowByType = async (id) => {
    const deletedReportBookBorrowByType = await ReportBookBorrowByType.findByIdAndDelete(id);
    if (!deletedReportBookBorrowByType) {
        throw new Error('ReportBookBorrowByType not found');
    }
    return deletedReportBookBorrowByType;
}

const getLastReport = async () => {
    const lastReport = await ReportBookBorrowByType.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
    return lastReport;
}

module.exports = {
    createReportBookBorrowByType,
    getReportBookBorrowByTypes,
    getReportBookBorrowByTypeById,
    updateReportBookBorrowByType,
    deleteReportBookBorrowByType,
    getLastReport
}