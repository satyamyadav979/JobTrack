const express = require('express');
const {
    getApplications,
    getApplication,
    createApplication,
    updateApplication,
    deleteApplication,
    getStats,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/').get(getApplications).post(createApplication);
router.get('/stats', getStats);
router.route('/:id').get(getApplication).put(updateApplication).delete(deleteApplication);

module.exports = router;
