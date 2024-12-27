const PenaltyReceiptService = require('../services/PenaltyReceiptService');
const ReaderService = require('../services/ReaderService');

const getAllPenaltyReceipts = async (req, res, next) => {
    console.log('getAllPenaltyReceipts');
    const penaltyReceipts = await PenaltyReceiptService.getAllPenaltyReceipts();
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: penaltyReceipts 
    };
    res.render('pages/penaltyreceipt_list', { penaltyReceipts });
    next();
}

const createPenaltyReceipt = async (req, res, next) => {
    console.log('createPenaltyReceipt');
    const penaltyReceipt = await PenaltyReceiptService.createPenaltyReceipt(req.body);
    req.responseData = {
        status: 201, 
        message: 'Success',
        data: penaltyReceipt 
    };
    res.render('pages/penaltyreceipt_success_create', { penaltyReceipt });
    next();
}

const deletePenaltyReceipt = async (req, res, next) => {
    console.log('deletePenaltyReceipt');
    const penaltyReceipt = await PenaltyReceiptService.deletePenaltyReceipt(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: penaltyReceipt 
    };
    next();
}

const updatePenaltyReceipt = async (req, res, next) => {
    console.log('updatePenaltyReceipt');
    const penaltyReceipt = await PenaltyReceiptService.updatePenaltyReceipt(req.params.id, req.body);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: penaltyReceipt 
    };
    next();
}

const getPenaltyReceiptById = async (req, res, next) => {
    console.log('getPenaltyReceiptById');
    const penaltyReceipt = await PenaltyReceiptService.getPenaltyReceiptById(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: penaltyReceipt 
    };
    next();
}

const getNewPenaltyReceipts = async (req, res, next) => {
    const readers = await ReaderService.getAllReadersWithPendingPenalty();
    res.render('pages/penaltyreceipt_create', { readers });
}

module.exports = {
    getAllPenaltyReceipts,
    createPenaltyReceipt,
    deletePenaltyReceipt,
    updatePenaltyReceipt,
    getPenaltyReceiptById,
    getNewPenaltyReceipts
}