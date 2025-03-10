const attendanceService = require('../services/attendance.service');


async function createAttendance(req, res) {
    try {
        const newRecord = await attendanceService.create(req.body);
        res.status(200).json({ status: 200, data: newRecord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
}


async function getAttendance(req, res) {
    try {
        const data = await attendanceService.find(req.query);
        res.status(200).json({ status: 200, data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
}


async function getAttendanceById(req, res) {
    try {
        const record = await attendanceService.findById(req.params.attendanceId);

        if (!record) {
            return res.status(404).json({ status: 404, message: 'Record not found.' });
        }

        res.status(200).json({ status: 200, data: record });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
}


async function updateAttendance(req, res) {
    try {
        const updatedRecord = await attendanceService.findByIdAndUpdate(req.params.attendanceId, req.body);

        if (!updatedRecord) {
            return res.status(404).json({ status: 404, message: 'Record not found.' });
        }

        res.status(200).json({ status: 200, data: updatedRecord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
}


async function deleteAttendance(req, res) {
    try {
        const deletedRecord = await attendanceService.findByIdAndDelete(req.params.attendanceId);

        if (!deletedRecord) {
            return res.status(404).json({ status: 404, message: 'Record not found.' });
        }

        res.status(200).json({ status: 200, message: "Deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
}

module.exports = {
    createAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
};
