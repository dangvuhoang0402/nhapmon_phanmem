const CustomError = require("../error/CustomError");
const ReaderRepo = require("../repo/ReaderRepo");
const UserRepo = require("../repo/UserRepo");

require("express-async-errors");

const createReader = async (reader) => {
    const {FullName, DayOfBirth, Email, Address, Type} = reader;
    const lastReader = await ReaderRepo.getLastReader();
    const lastNumber = lastReader 
        ? parseInt(lastReader.ReaderID.replace('READER', '')) 
        : 0;
    const ReaderID = `READER${lastNumber + 1}`;
    const user = await UserRepo.createReaderUser(ReaderID);
    const newReader = await ReaderRepo.createReader({
        ReaderID,
        FullName,
        DayOfBirth,
        Email,
        Address,
        Type,
        Date: new Date(),
        User: user._id
    });
    return newReader;
}

const getAllReaders = async () => {
    console.log("ReaderService.getAllReaders() called");
    const readers = await ReaderRepo.getReaders();
    return readers;
}

const getReaderById = async (id) => {
    console.log("ReaderService.getReaderById() called");
    const reader = await ReaderRepo.getReaderById(id);
    if (!reader) {
        throw new CustomError(404, "Reader not found");
    }
    return reader;
}

const updateReader = async (id, reader) => {
    console.log("ReaderService.updateReader() called");
    const updatedReader = await ReaderRepo.updateReader(id, reader);
    if (!updatedReader) {
        throw new CustomError(404, "Reader not found");
    }
    return updatedReader;
}

const deleteReader = async (id) => {
    console.log("ReaderService.deleteReader() called");
    const deletedReader = await ReaderRepo.deleteReader(id);
    if (!deletedReader) {
        throw new CustomError(404, "Reader not found");
    }
    return deletedReader;
}

const getAllReadersWithPendingPenalty = async () => {
    const readers = await ReaderRepo.getAllReadersWithPendingPenalty();
    return readers;
}

module.exports = {
    createReader,
    getAllReaders,
    getReaderById,
    updateReader,
    deleteReader,
    getAllReadersWithPendingPenalty
}