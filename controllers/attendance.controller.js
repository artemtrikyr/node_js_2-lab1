const attendanceService = require('../services/attendance.service');

// Додавання нового запису відвідуваності
async function createAttendance(req, res) {
    try {
        const newRecord = await attendanceService.create(req.body);
        res.status(200).json({ status: 200, data: newRecord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
}

// Отримання всіх записів відвідуваності
async function getAttendance(req, res) {
    try {
        res.status(200).json({ status: 200, data: await attendanceService.find(req.query) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
}

// Отримання запису відвідуваності за ID
async function getAttendanceById(req, res) {
    try {
        const { attendanceId } = req.params;
        const record = await attendanceService.findById(attendanceId);

        if (!record) {
            return res.status(404).json({ status: 404, message: 'Record not found.' });
        }

        res.status(200).json({ status: 200, data: record });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
}

// Оновлення запису відвідуваності
async function updateAttendance(req, res) {
    try {
        const { attendanceId } = req.params;
        const updatedRecord = await attendanceService.update(attendanceId, req.body);

        if (!updatedRecord) {
            return res.status(404).json({ status: 404, message: 'Record not found.' });
        }

        res.status(200).json({ status: 200, data: updatedRecord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
}

// Видалення запису відвідуваності
async function deleteAttendance(req, res) {
    try {
        const { attendanceId } = req.params;
        await attendanceService.remove(attendanceId);
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
