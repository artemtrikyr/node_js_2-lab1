const Attendance = require('../models/attendance.model');


async function create(attendance) {
    return Attendance.create(attendance);
}


async function find({ searchString = '', page = 1, perPage = 10 }) {
    const filter = {
        student: { $regex: searchString, $options: 'i' }
    };

    return {
        items: await Attendance.find(filter).skip((page - 1) * perPage).limit(Number(perPage)),
        count: await Attendance.countDocuments(filter),
    };
}


async function findById(attendanceId) {
    return Attendance.findById(attendanceId);
}


async function findByIdAndUpdate(attendanceId, update) {
    return Attendance.findByIdAndUpdate(attendanceId, update, { upsert: false, new: true });    
}


async function findByIdAndDelete(attendanceId) {
    return Attendance.findByIdAndDelete(attendanceId);
}

module.exports = { 
    create, 
    find, 
    findById, 
    findByIdAndUpdate, 
    findByIdAndDelete 
};
