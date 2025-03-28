const Joi = require("joi");
const createError = require("http-errors");

// Схема валідації для запису відвідувань
const attendanceSchema = Joi.object({
    group: Joi.string().required(),
    student: Joi.string().required(),
    subject: Joi.string().required(),
    teacher: Joi.string().required(),
    date: Joi.date().iso().required(),
    status: Joi.string().valid("present", "absent", "late").required()
});

// Middleware для валідації
function validateAttendance(req, res, next) {
    const { error } = attendanceSchema.validate(req.body);
    if (error) {
        return next(createError.BadRequest(error.details[0].message));
    }
    next();
}

module.exports = {
    validateAttendance,
};
