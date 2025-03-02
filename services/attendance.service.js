const mockData = require('../helpers/mock-data');

function _generateId() {
    const crypto = require("crypto");
    return crypto.randomBytes(16).toString("hex");
}

// Додавання нового запису відвідуваності
async function create(attendanceRecord) {
    const newRecord = { id: _generateId(), ...attendanceRecord };
    mockData.attendance.push(newRecord);
    return newRecord;
}

// Отримання всіх записів відвідуваності з можливістю фільтрації
async function find({ group, student, subject, teacher, status, page = 1, perPage = Number.MAX_SAFE_INTEGER }) {
    let results = mockData.attendance;

    if (group) results = results.filter(a => a.group.toLowerCase() === group.toLowerCase());
    if (student) results = results.filter(a => a.student.toLowerCase().includes(student.toLowerCase()));
    if (subject) results = results.filter(a => a.subject.toLowerCase() === subject.toLowerCase());
    if (teacher) results = results.filter(a => a.teacher.toLowerCase().includes(teacher.toLowerCase()));
    if (status) results = results.filter(a => a.status.toLowerCase() === status.toLowerCase());

    return {
        items: results.slice((page - 1) * perPage, page * perPage),
        count: results.length,
    };
}

// Отримання запису відвідуваності за ID
async function findById(id) {
    return mockData.attendance.find(a => a.id === id);
}

// Оновлення запису відвідуваності
async function update(attendanceId, updateData) {
    const index = mockData.attendance.findIndex(a => a.id === attendanceId);
    if (index === -1) return null;

    mockData.attendance[index] = { ...mockData.attendance[index], ...updateData };
    return mockData.attendance[index];
}

// Видалення запису відвідуваності
async function remove(id) {
    mockData.attendance = mockData.attendance.filter(a => a.id !== id);
}

module.exports = { create, find, findById, update, remove };
