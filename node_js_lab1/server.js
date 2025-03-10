const mongoose = require('mongoose');
const express = require('express');
const { port, mongodb_uri } = require('./config');
const attendanceRouter = require('./routes/attendance.route');

mongoose.connect(mongodb_uri)
    .then(() => {
        console.log('MongoDB connected');
    })

const app = express();

app.use(express.json());

app.use('/attendance', attendanceRouter);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
