const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');

router.get('/', attendanceController.getAttendance);
router.post('/', attendanceController.createAttendance);
router.get('/:attendanceId', attendanceController.getAttendanceById);
router.put('/:attendanceId', attendanceController.updateAttendance);
router.delete('/:attendanceId', attendanceController.deleteAttendance);

module.exports = router;
