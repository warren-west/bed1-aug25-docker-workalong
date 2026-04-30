require('dotenv').config()
const jwt = require('jsonwebtoken')

function isLoggedIn(req, res, next) {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
        res.status(401).json({ status: 'fail', message: 'JWT missing.' })
        return
    }
    
    const rawToken = authHeader.split(' ')[1]
    if (!rawToken) {
        res.status(401).json({ status: 'fail', message: 'JWT missing.' })
        return
    }
    
    try {
        const decodedToken = jwt.verify(rawToken, process.env.JWT_SECRET)
        next()

    } catch (error) {
        // check if it's a validation error, or server error.
        // We want to send back a 401 if it's a validation error.
        if (error.message === "invalid signature") {
            res.status(401).json({ status: 'Error', message: "Invalid token" })
            return
        }

        res.status(500).json({ status: 'Error', error: error })
        return
    }
}

function isAdmin(req, res, next) {
    // assume that isLoggedIn has already executed
    const rawToken = req.headers.authorization.split(' ')[1]
    
    try {
        // decode the token
        const decodedToken = jwt.verify(rawToken, process.env.JWT_SECRET)
        
        console.log(decodedToken)

        // check the user's role
        if (decodedToken.role !== "ADMIN") {
            res.status(401).json({ status: 'fail', message: 'JWT missing.' })
            return
        }
        
        next()
        
    } catch (error) {
        // check if it's a validation error, or server error.
        // We want to send back a 401 if it's a validation error.
        res.status(500).json({ status: 'Error', message: 'Server error.', error })
        return
    }
}

// revealing module pattern
module.exports = {
    isLoggedIn,
    isAdmin,
}