const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    maxApplications: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },

    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 

});

module.exports = mongoose.model('Vacancy', vacancySchema);
