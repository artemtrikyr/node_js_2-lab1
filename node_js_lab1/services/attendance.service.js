const Attendance = require('../models/attendance.model');

async function create(attendance) {
    try {
        return await Attendance.create(attendance);
    } catch (error) {
        throw new Error(`Error creating attendance: ${error.message}`);
    }
}

async function find({ searchString = '', page = 1, perPage = 10 }) {
    try {
        const filter = {
            student: { $regex: searchString, $options: 'i' }
        };

        const items = await Attendance.find(filter)
            .skip((page - 1) * perPage)
            .limit(Number(perPage))
            .lean();

        const count = await Attendance.countDocuments(filter);

        return { items, count };
    } catch (error) {
        throw new Error(`Error finding attendance: ${error.message}`);
    }
}

async function findById(attendanceId) {
    try {
        return await Attendance.findById(attendanceId).lean();
    } catch (error) {
        throw new Error(`Error finding attendance by ID: ${error.message}`);
    }
}

async function findByIdAndUpdate(attendanceId, update) {
    try {
        const updated = await Attendance.findByIdAndUpdate(attendanceId, update, { new: true }).lean();
        if (!updated) throw new Error(`Attendance with ID ${attendanceId} not found`);
        return updated;
    } catch (error) {
        throw new Error(`Error updating attendance: ${error.message}`);
    }
}

async function findByIdAndDelete(attendanceId) {
    try {
        const deleted = await Attendance.findByIdAndDelete(attendanceId).lean();
        if (!deleted) throw new Error(`Attendance with ID ${attendanceId} not found`);
        return deleted;
    } catch (error) {
        throw new Error(`Error deleting attendance: ${error.message}`);
    }
}

module.exports = {
    create,
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndDelete
};
