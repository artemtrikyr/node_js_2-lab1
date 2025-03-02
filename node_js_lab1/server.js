const express = require('express');
const { port } = require('./config');
const attendanceRouter = require('./routes/attendance.route');

const app = express();

app.use(express.json());

// Лог для перевірки запитів
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Підключаємо маршрут для відвідувань
app.use('/attendance', attendanceRouter);

// Додамо маршрут для головної сторінки (щоб перевірити сервер)
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
