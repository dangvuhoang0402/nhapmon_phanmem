const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ReportBookBorrowByTypeSchema = new mongoose.Schema(
  {
    ReportID: {
      type: String,
      required: true,
    },
    Year: {
      type: Number,
      required: true,
    },
    Month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    BookTypeStats: [{
      Number:{
        type: Number,
        required: true
      },
      BookType: {
        type: String,
        required: true
      },
      TotalBorrows: {
        type: Number,
        default: 0
      },
      PercentageOfTotal: {
        type: Number,
        default: 0
      }
    }],
    TotalBorrowsAllTypes: {
      type: Number,
      default: 0
    },
    GeneratedDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

ReportBookBorrowByTypeSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true,
  deletedByType: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("ReportBookBorrowByType", ReportBookBorrowByTypeSchema);