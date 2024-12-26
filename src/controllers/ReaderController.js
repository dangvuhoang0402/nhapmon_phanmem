const ReaderService = require('../services/ReaderService');
const Rule = require('../models/Rule');

const getAllReaders = async (req, res, next) => {
    console.log('getAllReaders');
    const readers = await ReaderService.getAllReaders();
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: readers 
    };
    next();
}

const createReader = async (req, res, next) => {
    console.log('createReader');
    const reader = await ReaderService.createReader(req.body);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reader 
    };
    const rules = await Rule.findOne().populate('ReaderRules');
    res.render('pages/reader_success_created', { reader: reader  , rules: rules });
}

const deleteReader = async (req, res, next) => {
    console.log('deleteReader');
    const reader = await ReaderService.deleteReader(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reader 
    };
    next();
}

const updateReader = async (req, res, next) => {
    console.log('updateReader');
    const reader = await ReaderService.updateReader(req.params.id, req.body);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reader 
    };
    next();
}

const getReaderById = async (req, res, next) => {
    console.log('getReaderById');
    const reader = await ReaderService.getReaderById(req.params.id);
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: reader 
    };
    next();
}

const getNewReaders = async (req, res, next) => {
    console.log('getNewReaders');
    const rules = await Rule.findOne().populate('ReaderRules');
    res.render('pages/reader_create' , { rules: rules });
}

module.exports = {
    getAllReaders,
    createReader,
    deleteReader,
    updateReader,
    getReaderById,
    getNewReaders
}