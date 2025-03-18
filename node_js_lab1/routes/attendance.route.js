const express = require('express');
const router = express.Router();

const controller = require('../controllers/attendance.controller');
const { authenticationCheck } = require('../middlewares/auth.middleware');
const { attendanceByIdValidation } = require('../middlewares/attendance.middleware');
const { validateAttendance } = require('../middlewares/validation.middleware');

router.route('/')
    .get(authenticationCheck, controller.getAttendance)
    .post(authenticationCheck, validateAttendance, controller.createAttendance);

router.route('/:attendanceId')
    .get(authenticationCheck, attendanceByIdValidation, controller.getAttendanceById)
    .put(authenticationCheck, attendanceByIdValidation, validateAttendance, controller.updateAttendance)
    .delete(authenticationCheck, attendanceByIdValidation, controller.deleteAttendance);

module.exports = router;
