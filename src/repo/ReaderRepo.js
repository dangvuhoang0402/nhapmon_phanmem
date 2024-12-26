const Reader= require('../models/Reader');
require("express-async-errors");

const createReader = async (readerData) => {
    const newReader = await Reader.create(readerData);
    return newReader;
}

const getReaders = async () => {
    const allReaders = await Reader.find();
    return allReaders;
}

const getReaderById = async (id) => {
    const reader = await Reader.findById(id);
    if (!reader) {
        throw new Error('Reader not found');
    }
    return reader;
}

const updateReader = async (id, readerData) => {
    const updatedReader = await Reader.findByIdAndUpdate
    (id, readerData, { new: true });
    return updatedReader;
}

const deleteReader = async (id) => {
    const deletedReader = await Reader.findByIdAndDelete(id);
    if (!deletedReader) {
        throw new Error('Reader not found');
    }
    return deletedReader;
}
const getLastReader = async () => {
    return await Reader.findOne().sort({ ReaderID: -1 });
};

const updateReaderPenalty = async (readerId, penalty) => {
    console.log("Reader ID:", readerId);
    console.log("Penalty Amount:", Number(penalty));
    
    const updatedReader = await Reader.findByIdAndUpdate(
        readerId,
        { $inc: { PendingPenalty: Number(penalty) } },
        { new: true }
    );
    
    console.log("Updated Reader:", updatedReader);
    return updatedReader;
};

const getAllReadersWithPendingPenalty = async () => {
    const readers = await Reader.find({ PendingPenalty: { $gt: 0 } });
    return readers;
};

module.exports = {
    createReader,
    getReaders,
    getReaderById,
    updateReader,
    deleteReader,
    getLastReader,
    updateReaderPenalty,
    getAllReadersWithPendingPenalty
}