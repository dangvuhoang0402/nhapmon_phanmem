const PenaltyReceipt= require('../models/PenaltyReceipt');
require("express-async-errors");

const createPenaltyReceipt = async (penaltyReceiptData) => {
    const newPenaltyReceipt = await PenaltyReceipt.create(penaltyReceiptData);
    return newPenaltyReceipt.populate('Reader');
}

const getPenaltyReceipts = async () => {
    const allPenaltyReceipts = await PenaltyReceipt.find().populate('loanTicket');
    return allPenaltyReceipts;
}

const getPenaltyReceiptById = async (id) => {
    const penaltyReceipt = await PenaltyReceipt.findById(id);
    if (!penaltyReceipt) {
        throw new Error('PenaltyReceipt not found');
    }
    return penaltyReceipt;
}

const updatePenaltyReceipt = async (id, penaltyReceiptData) => {
    const updatedPenaltyReceipt = await PenaltyReceipt.findByIdAndUpdate(id, penaltyReceiptData, { new: true });
    return updatedPenaltyReceipt;
}

const deletePenaltyReceipt = async (id) => {
    const deletedPenaltyReceipt = await PenaltyReceipt.findByIdAndDelete(id);
    if (!deletedPenaltyReceipt) {
        throw new Error('PenaltyReceipt not found');
    }
    return deletedPenaltyReceipt;
}

const getLastPenaltyReceipt = async () => {
    const lastPenaltyReceipt = await PenaltyReceipt.findOne().sort({ _id: -1 });
    return lastPenaltyReceipt;
}

module.exports = {
    createPenaltyReceipt,
    getPenaltyReceipts,
    getPenaltyReceiptById,
    updatePenaltyReceipt,
    deletePenaltyReceipt,
    getLastPenaltyReceipt
}