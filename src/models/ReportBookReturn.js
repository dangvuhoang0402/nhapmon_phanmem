const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ReportBookReturnSchema = new mongoose.Schema(
  {
    ReportID: {
      type: String,
      required: true
    },
    Month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    Year: {
      type: Number,
      required: true
    },
    ReturnDetails: [{
      BookName: {
        type: String,
        required: true
      },
      BorrowDate: {
        type: Date,  
        required: true
      },
      DueDays: {
        type: Number,
        required: true,
        default: 0
      }
    }],
    TotalBooks: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
);

ReportBookReturnSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true
});

module.exports = mongoose.model('ReportBookReturn', ReportBookReturnSchema);