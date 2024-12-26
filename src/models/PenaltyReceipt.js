const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const PenaltyReceiptSchema = new mongoose.Schema(
  {
    ReceiptID: {
      type: String,
      required: true,
    },
    AmountPaid: {
      type: Number,
      required: true,
      min: 0
    },
    PaymentDate: {
      type: Date,
      default: Date.now,
      required: true
    },
    Notes: {
      type: String
    },
    Reader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reader",
      required: true
    }
  },
  { timestamps: true }
);

PenaltyReceiptSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true,
  deletedByType: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("PenaltyReceipt", PenaltyReceiptSchema);