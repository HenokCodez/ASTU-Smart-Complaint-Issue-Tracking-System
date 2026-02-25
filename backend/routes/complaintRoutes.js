const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const {
    createComplaint,
    getMyComplaints,
    getAssignedComplaints,
    getAllComplaints,
    updateComplaint
} = require('../controllers/complaintController');

router.post('/', protect, authorize('student'), upload.single('attachment'), createComplaint);
router.get('/my', protect, authorize('student'), getMyComplaints);
router.get('/assigned', protect, authorize('staff'), getAssignedComplaints);
router.get('/all', protect, authorize('admin'), getAllComplaints);
router.put('/:id', protect, authorize('staff', 'admin'), updateComplaint);

module.exports = router;
