const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    countrycode:  { type: Number, required: true },
    code: { type: String, required: true },
    status: { type: Boolean, required: true },
    updated: { type: Date, default: Date.now }
});

module.exports.VerificationLog = mongoose.model('VerificationLog', VerificationSchema);