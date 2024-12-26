const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const RuleSchema = new mongoose.Schema({
    ReaderRules: {
        MinAge: {
            type: Number,
            required: true,
            default: 18
        },
        CardValidityMonths: {
            type: Number,
            required: true,
            default: 6
        }
    },
    BookRules: {
        BookTypes: [{
            type: String,
            required: true,
            default: ['A', 'B', 'C']
        }],
        MaxPublishYearDiff: {
            type: Number,
            required: true,
            default: 8
        }
    },
}, { 
    timestamps: true,
    versionKey: '__v' // Change to string or false
});

RuleSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true
});

module.exports = mongoose.model('Rule', RuleSchema);