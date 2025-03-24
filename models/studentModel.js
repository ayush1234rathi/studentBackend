const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    age: {
        type: Number,
        required: true, 
        min: [0, 'Age must be a positive number'], 
    },
    email: {
        type: String,
        required: true, 
        unique: true, 
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address'], 
    }
}, { timestamps: true }); 

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
