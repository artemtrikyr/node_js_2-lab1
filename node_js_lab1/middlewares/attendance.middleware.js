const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const Attendance = require('../models/attendance.model');

async function attendanceByIdValidation(req, res, next) {
    try {
        const { attendanceId } = req.params;

        if (!ObjectId.isValid(attendanceId)) {
            throw createError.BadRequest("Attendance id is not valid");
        }

        const attendance = await Attendance.findById(attendanceId);

        if (!attendance) {
            throw createError.NotFound("Attendance with such id not found");
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    attendanceByIdValidation,
};
