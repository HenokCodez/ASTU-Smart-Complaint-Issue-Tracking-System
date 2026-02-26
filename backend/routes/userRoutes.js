const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all staff members (Admin only)
router.get('/staff', protect, authorize('admin'), async (req, res) => {
    try {
        const staff = await User.find({ role: 'staff' }).select('name email department');
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
