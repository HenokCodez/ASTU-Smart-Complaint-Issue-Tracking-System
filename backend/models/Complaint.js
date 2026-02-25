const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Academic', 'Dormitory', 'Cafeteria', 'Library', 'IT', 'Other']
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open'
    },
    attachment: {
        type: String,
        default: null
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedDepartment: {
        type: String,
        default: null
    },
    remarks: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
