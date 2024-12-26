const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const BookSchema = new mongoose.Schema(
  {
    BookID:{
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true
    },
    Type: {
      type: String,
      required: true,
    },
    Author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true
    },
    YearPublish: {
      type: Number,
      required: true
    },
    Publisher: {
      type: String,
      required: true
    },
    DateIn: {
      type: Date,
      required: true,
      default: Date.now
    },
    Price: {
      type: Number,
      required: true,
      min: 0
    },
    Status: {
      type: Number,
      default: 1, // 1: available, 0: not available
    },
  },
  { timestamps: true }
);

BookSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true,
  deletedByType: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Book", BookSchema);