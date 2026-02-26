const { check, validationResult } = require('express-validator');

const validateRegister = [
    check('name', 'Name is required').not().isEmpty().trim().escape(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateLogin = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateComplaint = [
    check('title', 'Title is required').not().isEmpty().trim().escape().isLength({ max: 100 }),
    check('description', 'Description is required').not().isEmpty().trim().escape().isLength({ max: 1000 }),
    check('category', 'Invalid category').isIn(['Academic', 'Dormitory', 'Cafeteria', 'Library', 'IT', 'Other']),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateRegister,
    validateLogin,
    validateComplaint
};
