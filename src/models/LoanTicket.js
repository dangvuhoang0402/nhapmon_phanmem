const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const LoanTicket = new mongoose.Schema(
  {
    LoanTicketID: {
      type: String,
      required: true,
    },
    Books: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }],
    Reader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reader",
      required: true,
    },
    StartDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    DueDate: {
      type: Date,
      required: true
    },
    Status:{
      type: Number,
      required: true,
      default: 1 // 1: Active, 0: Inactive
    }
  },
  { timestamps: true }
);

LoanTicket.plugin(mongooseDelete, {
    overrideMethods: "all",
    deletedAt: true,
    deletedBy: true,
    deletedByType: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("LoanTicket", LoanTicket);