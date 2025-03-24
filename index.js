const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./connection/connectDB');  
const studentRoutes = require('./routes/studentRoutes');  

const app = express();

app.use(express.json());

connectDB('mongodb://127.0.0.1:27017/students')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Student API');
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
