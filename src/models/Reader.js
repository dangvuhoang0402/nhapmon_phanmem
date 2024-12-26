const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ReaderSchema = new mongoose.Schema(
  {
    ReaderID: {
      type: String,
      required: true,
      unique: true,
    },
    FullName: {
      type: String,
      required: true,
    },
    DayOfBirth: {
        type: Date,
        required: true
    },
    Email: {
      type: String,
      required: true,
      unique: true
    },
    Address: {
      type: String,
    },
    Type: {
      type: String,
      required: true,
      enum: ["X", "Y"],
    },
    Date: {
      type: Date,
      required: true
    },
    PendingPenalty: {
      type: Number,
      default: 0
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

ReaderSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true,
  deletedByType: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Reader", ReaderSchema);