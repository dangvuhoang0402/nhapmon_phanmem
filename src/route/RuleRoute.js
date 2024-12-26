const RuleController = require('../controllers/RuleController');
const express = require('express');

const router = express.Router();

router.get('/reader', RuleController.getReadersRule);
router.get('/book', RuleController.getBooksRule);
router.post('/reader', RuleController.updateReadersRule);
router.post('/book', RuleController.updateBooksRule);

module.exports = router;