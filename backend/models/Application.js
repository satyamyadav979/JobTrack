const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    companyName: {
        type: String,
        required: [true, 'Please add a company name'],
        trim: true,
    },
    jobRole: {
        type: String,
        required: [true, 'Please add a job role'],
        trim: true,
    },
    applicationDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied',
    },
    jobUrl: {
        type: String,
        match: [
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            'Please add a valid URL',
        ],
    },
    notes: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Application', ApplicationSchema);
