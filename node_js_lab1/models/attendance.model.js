const { Schema, model } = require('mongoose');
const statusEnum = require('../enums/status.enum')

const attendanceSchema = new Schema({
    group: {
        type: String,
        required: true,
        trim: true, // Забирає зайві пробіли
    },
    student: {
        type: String,
        required: true,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    teacher: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(statusEnum),
        required: true,
    }
}, {
    timestamps: true
});


const Attendance = model('Attendance', attendanceSchema);

module.exports = Attendance;
