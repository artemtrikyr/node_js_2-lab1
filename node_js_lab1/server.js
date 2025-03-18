const mongoose = require('mongoose');
const express = require('express');
const { port, mongodb_uri } = require('./config');
const attendanceRouter = require('./routes/attendance.route');
const createError = require('http-errors');

mongoose.connect(mongodb_uri)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error(`❌ MongoDB connection error: ${err.message}`));

const app = express();

app.use(express.json());

app.use('/attendance', attendanceRouter);

// Обробка неправильних маршрутів
app.use((req, res, next) => {
    next(createError.NotFound('Route not found'));
});

// Глобальний обробник помилок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ status: err.status || 500, message: err.message });
});

app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
