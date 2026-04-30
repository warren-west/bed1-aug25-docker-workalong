const db = require('../models')
const AuthService = require('../services/AuthService')
const authService = new AuthService(db)
const bcrypt = require('bcrypt')

async function basicAuth(req, res, next) {
    if (!req.headers.authorization) {
        // 400: user does not exist in DB
        res.status(401).json({ status: 'fail', message: 'Incorrect login credentials' })
        return
    }

    // split the auth header "Basic adlfhvbakhvb" by the white space
    const basicAuth = req.headers.authorization.split(' ')[1]
    console.log(basicAuth)
    // decode the "adlfhvbakhvb" to get warren-west:1234 (username:password)
    const credentials = atob(basicAuth) // https://developer.mozilla.org/en-US/docs/Web/API/Window/atob

    // save username and password into variables when splitting by ":"
    const [username, password] = credentials.split(':')

    // use the username to find a User in the DB
    const result = await authService.getUserByUsername(username)

    if (!result) {
        // 404: user does not exist in DB
        res.status(401).json({ status: 'fail', message: 'Incorrect login credentials' })
        return
    }
    
    // if the user is found in the DB, check that the password matches the hashed password in the DB
    if (!bcrypt.compareSync(password, result.password)) {
        // passwords don't match: 401
        res.status(401).json({ status: 'fail', message: 'Incorrect login credentials' })
        return
    }

    // don't return a 401, grant the user access
    next()
}

// export the basic authentication logic
module.exports = {
    basicAuth,
}