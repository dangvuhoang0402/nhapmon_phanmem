const ReportBookBorrowByTypeService = require('../services/ReportBookBorrowByTypeService');

const getAllReportBookBorrowByTypes = async (req, res, next) => {
    console.log('getAllReportBookBorrowByTypes');
    const reportBookBorrowByTypes = await ReportBookBorrowByTypeService.getAllReportBookBorrowByTypes();
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reportBookBorrowByTypes 
    };
    next();
}

const createReportBookBorrowByType = async (req, res, next) => {
    console.log('createReportBookBorrowByType');
    const reportBookBorrowByType = await ReportBookBorrowByTypeService.createReportBookBorrowByType(req.body);
    req.responseData = {
        status: 201, 
        message: 'Success',
        data: reportBookBorrowByType 
    };
    res.render('pages/report_borrow_success_create' , {report:reportBookBorrowByType});
    next();
}

const deleteReportBookBorrowByType = async (req, res, next) => {
    console.log('deleteReportBookBorrowByType');
    const reportBookBorrowByType = await ReportBookBorrowByTypeService.deleteReportBookBorrowByType(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reportBookBorrowByType 
    };
    next();
}

const updateReportBookBorrowByType = async (req, res, next) => {
    console.log('updateReportBookBorrowByType');
    const reportBookBorrowByType = await ReportBookBorrowByTypeService.updateReportBookBorrowByType(req.params.id, req.body);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reportBookBorrowByType 
    };
    next();
}

const getReportBookBorrowByTypeById = async (req, res, next) => {
    console.log('getReportBookBorrowByTypeById');
    const reportBookBorrowByType = await ReportBookBorrowByTypeService.getReportBookBorrowByTypeById(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reportBookBorrowByType 
    };
    next();
}

const getNewReportBookBorrowByTypes = async (req, res, next) => {
    console.log('getNewReportBookBorrowByTypes');
    res.render('pages/report_borrow_create');
}

module.exports = {
    getAllReportBookBorrowByTypes,
    createReportBookBorrowByType,
    deleteReportBookBorrowByType,
    updateReportBookBorrowByType,
    getReportBookBorrowByTypeById,
    getNewReportBookBorrowByTypes
}