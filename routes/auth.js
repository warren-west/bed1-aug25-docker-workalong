require('dotenv').config()
const router = require('express').Router()
const db = require('../models')
const AuthService = require('../services/AuthService')
const authService = new AuthService(db)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// POST /auth/register
router.post('/register', async (req, res) => {

    // Get new user credentials from req.body
    const { username, email, password } = req.body

    // validate inputs
    if (!username || !email || !password) {
        res.status(400).json({ status: 'fail', message: 'Invalid inputs.' })
        return
    }

    // function encapsulating password validation logic
    validatePassword(password, res)

    try {
        // hash the password to give to the service
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS))
        const hashedPassword = bcrypt.hashSync(password, salt)

        // Create a new user record in the DB
        const result = await authService.createUser(username, email, hashedPassword)
        
        // get rid of the other "stuff" from Sequelize response
        const resultWithoutPassword = JSON.parse(JSON.stringify(result))
        delete resultWithoutPassword.password

        // Return a success message (no token yet)
        res.status(201).json({ status: 'success', message: 'New user created.', data: resultWithoutPassword })
        return

    } catch (error) {

        if (!error.errors) {
            res.status(500).json({ status: 'error', message: 'Server error.', error })
            return
        }

        let errorMessages = []

        // iterate through error.errors
        for (let e of error.errors) {
            errorMessages.push(`'${e.value}': ${e.message}`)
        }

        // send response with custom error messages
        res.status(400).json({ status: 'error', message: 'Server error.', errorMessages })
        return
    }
})

// POST /auth/login
router.post('/login', async (req, res) => {
    // Get user login credentials
    const { username, password } = req.body

    // validate
    if (!username || !password) {
        res.status(400).json({ status: 'fail', message: 'Invalid user credentials.' })
        return
    }
    
    try {
        // Check that the user exists for the given credentials
        const result = await authService.getUserByUsername(username)
        
        console.log(result)

        // no user found
        if (!result) {
            res.status(400).json({ status: 'fail', message: 'Invalid user credentials.' })
            return
        }
        
        // Check if the password is incorrect
        if (!bcrypt.compareSync(password, result.password)) {
            res.status(400).json({ status: 'fail', message: 'Invalid user credentials.' })
            return
        }

        const resultWithoutPassword = JSON.parse(JSON.stringify(result))
        delete resultWithoutPassword.password
        
        // Issue a token
        const token = jwt.sign(resultWithoutPassword, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        // Send the success response
        res.json({ status: 'success', token })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error.' })
        return
    }
})

/**
 * Validate a given password. A password must be between 4 and 100 character, and must contain a letter (uppercase and lowercase), and a number.
 * @param {String} password 
 */
function validatePassword(password, res) {
    if (password.length < 4 || password.length > 100) {
        res.status(400).json({ status: 'fail', message: 'Password must be between 4 and 100 characters.' })
        return
    }

    // check password contains stuff:
    if (!/[a-zA-Z0-9]/.test(password)) {
        res.status(400).json({ status: 'fail', message: 'Password must contain letters, numbers...' })
        return
    }
}

module.exports = router