const Students = require('../models/studentModel'); 

const createStudent = async (req, res) => {
    try {
        const { name, age, email } = req.body;

        const newStudent = new Students({
            name,
            age,
            email
        });

        const savedStudent = await newStudent.save();
        res.status(201).json({ student_id: savedStudent._id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create student', error });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Students.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve students', error });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await Students.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get student', error });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { name, age, email } = req.body;
        const updatedData = {};

        if (name) updatedData.name = name;
        if (age) updatedData.age = age;
        if (email) updatedData.email = email;

        const updatedStudent = await Students.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update student', error });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await Students.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete student', error });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};
