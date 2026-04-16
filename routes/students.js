const router = require('express').Router()

// GET /students
// Get all students from "database"
router.get('/', (req, res) => {
    const allStudents = require('../data/students')

    // check if student list is empty
    if (allStudents.length === 0 || !allStudents) {
        res.status(404).json({ status: 'fail', message: 'No students found.' })
        return
    }

    // student list is populated
    res.json({ status: 'success', data: allStudents })
    return
})

// GET /:id
// Get student by studId
router.get('/:id', (req, res) => {
    const { id } = req.params

    // validate the id
    if (!id || isNaN(id)) {
        res.status(400).json({ status: 'fail', message: 'Invalid student id'})
        return
    }

    // id is valid
    const allStudents = require('../data/students')
    const result = allStudents.find((stud) => stud.studId == id)

    // no student found
    if (!result) {
        res.status(404).json({ status: 'fail', message: `Student with the id ${id} not found.` })
        return
    }

    // student was found
    res.json({ status: 'success', data: result })
    return
})

module.exports = router