const Rule= require('../models/Rule');

const getReadersRule = async (req, res, next) => {
    console.log('getReadersRule');
    const rule = await Rule.findOne().populate('ReaderRules');
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: rule.ReaderRules 
    };
    res.render('pages/reader_rules_create', { rules: rule });
    next();
}

const getBooksRule = async (req, res, next) => {
    console.log('getBooksRule');
    const rule = await Rule.findOne().populate('BookRules');
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: rule.BookRules 
    };
    res.render('pages/book_rules_create', { rules: rule });
    next();
}

const updateReadersRule = async (req, res, next) => {
    console.log('updateReadersRule');
    const rule = await Rule.findOne();
    rule.ReaderRules = req.body;
    await rule.save();
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: rule.ReaderRules 
    };
    res.render('pages/reader_rules_success_create', { rules: rule });
    next();
}

const updateBooksRule = async (req, res, next) => {
    console.log('updateBooksRule');
    const rule = await Rule.findOne();
    rule.BookRules = req.body;
    await rule.save();
    req.responseData = {
        status: 200, 
        message: 'Success',
        data: rule.BookRules 
    };
    res.render('pages/book_rules_success_create', { rules: rule });
    next();
}

module.exports = {
    getReadersRule,
    getBooksRule,
    updateReadersRule,
    updateBooksRule
};