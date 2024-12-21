const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vacancy: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacancy', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
