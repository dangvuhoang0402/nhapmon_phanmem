const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const AuthorSchema = new mongoose.Schema(
  {
    FullName: {
        type: String,
        required: true
    },
    BirthDate: {
      type: Date
    },
    DeathDate: {
      type: Date
    },
    Nationality: {
      type: String
    },
    Books: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }]
  },
  { timestamps: true }
);

AuthorSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true,
  deletedByType: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Author", AuthorSchema);