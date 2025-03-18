const { body, validationResult } = require('express-validator');

const validateAttendance = [
    body('student').notEmpty().withMessage('Student is required'),
    body('group').notEmpty().withMessage('Group is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('teacher').notEmpty().withMessage('Teacher is required'),
    body('date').isISO8601().withMessage('Invalid date format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateAttendance };
