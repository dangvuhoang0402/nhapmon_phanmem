const ReportBookReturnService = require('../services/ReportBookReturnService');

const getAllReportBookReturns = async (req, res, next) => {
    console.log('getAllReportBookReturns');
    const reportBookReturns = await ReportBookReturnService.getAllReportBookReturns();
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reportBookReturns 
    };
    next();
}

const createReportBookReturn = async (req, res, next) => {
    console.log('createReportBookReturn');
    const reportBookReturn = await ReportBookReturnService.createReportBookReturn(req.body);
    req.responseData = {
        status: 201, 
        message: 'Success',
        data: reportBookReturn 
    };
    res.render('pages/report_return_success_create' , {report:reportBookReturn});
    next();
}

const deleteReportBookReturn = async (req, res, next) => {
    console.log('deleteReportBookReturn');
    const reportBookReturn = await ReportBookReturnService.deleteReportBookReturn(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reportBookReturn 
    };
    next();
}

const updateReportBookReturn = async (req, res, next) => {
    console.log('updateReportBookReturn');
    const reportBookReturn = await ReportBookReturnService.updateReportBookReturn(req.params.id, req.body);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reportBookReturn 
    };
    next();
}

const getReportBookReturnById = async (req, res, next) => {
    console.log('getReportBookReturnById');
    const reportBookReturn = await ReportBookReturnService.getReportBookReturnById(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reportBookReturn 
    };
    next();
}

const getNewReportBookReturns = async (req, res, next) => {
    res.render('pages/report_return_create');
}

module.exports = {
    getAllReportBookReturns,
    createReportBookReturn,
    deleteReportBookReturn,
    updateReportBookReturn,
    getReportBookReturnById,
    getNewReportBookReturns
}
