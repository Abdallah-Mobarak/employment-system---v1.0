const { body, param, validationResult } = require('express-validator');

// Middleware للتحقق من صحة بيانات تسجيل المستخدم
exports.validateUserRegistration = [
    body('name').isString().notEmpty().withMessage('الاسم مطلوب'),
    body('email').isEmail().withMessage('البريد الإلكتروني غير صالح'),
    body('password').isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون على الأقل 6 أحرف'),
    body('role').isIn(['employer', 'applicant']).withMessage('الدور يجب أن يكون employer أو applicant'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware login للتحقق من صحة بيانات تسجيل المستخدم
exports.validateUserlogin = [
    body('email').isEmail().withMessage('البريد الإلكتروني غير صالح'),
    body('password').isLength({ min: 6 }).withMessage("كلمة السر غير صحيحة"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware للتحقق من بيانات الوظائف
exports.validateVacancy = [
    body('title').isString().notEmpty().withMessage('عنوان الوظيفة مطلوب'),
    body('description').isString().notEmpty().withMessage('الوصف مطلوب'),
    body('location').isString().notEmpty().withMessage('الموقع مطلوب'),
    body('maxApplications').isInt({ min: 1 }).withMessage('الحد الأقصى للمتقدمين يجب أن يكون رقماً صحيحاً'),
    body('expiryDate').isISO8601().toDate().withMessage('تاريخ الانتهاء غير صالح').custom(value => {
        const currentDate = new Date();
        if (new Date(value) < currentDate) {
            throw new Error('تاريخ الانتهاء لا يمكن أن يكون قبل اليوم');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware للتحقق من صحة بيانات التقديم
exports.validateApplication = [
    body('vacancyId').isMongoId().withMessage('معرف الوظيفة غير صالح'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
