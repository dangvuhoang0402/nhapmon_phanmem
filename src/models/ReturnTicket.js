const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ReturnTicketSchema = new mongoose.Schema(
  {
    ReturnTicketID: {
      type: String,
      required: true,
    },
    LoanTicketID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LoanTicket',
      required: true,
    },
    BookDetails: [{
      Book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
      },
      Penalty: {
        type: Number,
        default: 0
      },
      Notes: {
        type: String
      }
    }],
    ReturnDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    TotalPenalty: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

ReturnTicketSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true,
  deletedByType: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("ReturnTicket", ReturnTicketSchema);