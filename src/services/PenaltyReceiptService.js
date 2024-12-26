const CustomError = require("../error/CustomError");
const PenaltyReceiptRepo = require("../repo/PenaltyReceiptRepo");
const ReaderRepo = require("../repo/ReaderRepo");

require("express-async-errors");
const createPenaltyReceipt = async (penaltyReceiptData) => {
    // Get last receipt and generate new ID
    const lastReceipt = await PenaltyReceiptRepo.getLastPenaltyReceipt();
    const lastNumber = lastReceipt 
        ? parseInt(lastReceipt.ReceiptID.replace('PR', '')) 
        : 0;
    const ReceiptID = `PR${lastNumber + 1}`;

    // Create new receipt with generated ID
    const newPenaltyReceipt = await PenaltyReceiptRepo.createPenaltyReceipt({
        ...penaltyReceiptData,
        ReceiptID
    });
    // Update reader's pending penalty (subtract paid amount)
    const updatedReader = await ReaderRepo.updateReaderPenalty(
        penaltyReceiptData.Reader, 
        -penaltyReceiptData.AmountPaid
    );
    return newPenaltyReceipt;
};

const getAllPenaltyReceipts = async () => {
    console.log("PenaltyReceiptService.getAllPenaltyReceipts() called");
    const penaltyReceipts = await PenaltyReceiptRepo.getPenaltyReceipts();
    return penaltyReceipts;
}

const getPenaltyReceiptById = async (id) => {
    console.log("PenaltyReceiptService.getPenaltyReceiptById() called");
    const penaltyReceipt = await PenaltyReceiptRepo.getPenaltyReceiptById(id);
    if (!penaltyReceipt) {
        throw new CustomError(404, "PenaltyReceipt not found");
    }
    return penaltyReceipt;
}

const updatePenaltyReceipt = async (id, penaltyReceipt) => {
    console.log("PenaltyReceiptService.updatePenaltyReceipt() called");
    const updatedPenaltyReceipt = await PenaltyReceiptRepo.updatePenaltyReceipt(id, penaltyReceipt);
    if (!updatedPenaltyReceipt) {
        throw new CustomError(404, "PenaltyReceipt not found");
    }
    return updatedPenaltyReceipt;
}

const deletePenaltyReceipt = async (id) => {
    console.log("PenaltyReceiptService.deletePenaltyReceipt() called");
    const deletedPenaltyReceipt = await PenaltyReceiptRepo.deletePenaltyReceipt(id);
    if (!deletedPenaltyReceipt) {
        throw new CustomError(404, "PenaltyReceipt not found");
    }
    return deletedPenaltyReceipt;
}

module.exports = {
    createPenaltyReceipt,
    getAllPenaltyReceipts,
    getPenaltyReceiptById,
    updatePenaltyReceipt,
    deletePenaltyReceipt
}