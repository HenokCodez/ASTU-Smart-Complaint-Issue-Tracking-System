const Complaint = require('../models/Complaint');

const createComplaint = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        const complaint = await Complaint.create({
            title,
            description,
            category,
            studentId: req.user._id,
            attachment: req.file ? req.file.filename : null
        });

        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ studentId: req.user._id }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAssignedComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            $or: [
                { assignedDepartment: req.user.department },
                { assignedStaffId: req.user._id }
            ]
        })
            .populate('studentId', 'name email')
            .populate('assignedStaffId', 'name email')
            .sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate('studentId', 'name email')
            .populate('assignedStaffId', 'name email')
            .sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        const { status, remarks, assignedDepartment, assignedStaffId } = req.body;
        if (status) complaint.status = status;
        if (remarks) complaint.remarks = remarks;
        if (assignedDepartment) complaint.assignedDepartment = assignedDepartment;
        if (assignedStaffId) complaint.assignedStaffId = assignedStaffId;

        const updated = await complaint.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createComplaint,
    getMyComplaints,
    getAssignedComplaints,
    getAllComplaints,
    updateComplaint
};
