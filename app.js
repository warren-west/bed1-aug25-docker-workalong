const express = require('express')
const app = express()

// import routers
const studentRouter = require('./routes/students')

// connect routes
app.use('/students', studentRouter)
// middleware

// let server listen
app.listen(3000, () => {
    console.log(`Server is listening on port 3000...`)
})