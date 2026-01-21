const Application = require('../models/Application');

// @desc    Get all applications for current user
// @route   GET /api/applications
// @access  Private
exports.getApplications = async (req, res, next) => {
    try {
        const applications = await Application.find({ userId: req.user.id }).sort('-applicationDate');

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
exports.getApplication = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }

        // Make sure user owns application
        if (application.userId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to access this application' });
        }

        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
exports.createApplication = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.userId = req.user.id;

        const application = await Application.create(req.body);

        res.status(201).json({
            success: true,
            data: application,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private
exports.updateApplication = async (req, res, next) => {
    try {
        let application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }

        // Make sure user owns application
        if (application.userId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to update this application' });
        }

        application = await Application.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
exports.deleteApplication = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }

        // Make sure user owns application
        if (application.userId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to delete this application' });
        }

        await application.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get application stats
// @route   GET /api/applications/stats
// @access  Private
exports.getStats = async (req, res, next) => {
    try {
        const stats = await Application.aggregate([
            { $match: { userId: req.user._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);

        // Format stats
        const formattedStats = {
            total: 0,
            Applied: 0,
            Interview: 0,
            Offer: 0,
            Rejected: 0,
        };

        stats.forEach((stat) => {
            formattedStats[stat._id] = stat.count;
            formattedStats.total += stat.count;
        });

        res.status(200).json({
            success: true,
            data: formattedStats,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
