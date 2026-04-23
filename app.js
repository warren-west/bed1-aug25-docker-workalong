require('dotenv').config()
const express = require('express')
const app = express()

const db = require('./models') // import the db wrapper object

// Check the DB connection
db.sequelize.validate()
    .then(() => {
        console.log(`Database connected successfully! ✅`)
        // Sync the DB if the connection is successful
        db.sequelize.sync()
            .then(() => console.log("Database schema updated. ✅"))
            .catch((error) => console.error("Error updating DB schema. ❌"))
    })
    .catch((error) => console.error(`Database could not connect. ❌`))


// import routers
const studentRouter = require('./routes/students')
const populateRouter = require('./routes/populate')
const bandsRouter = require('./routes/bands')
const membersRouter = require('./routes/members')
const genresRouter = require('./routes/genres')

// connect routes
app.use('/students', studentRouter)
app.use('/populate', populateRouter)
app.use('/bands', bandsRouter)
app.use('/members', membersRouter)
app.use('/genres', genresRouter)
// middleware

const port = process.env.PORT || '3000'

// let server listen
app.listen(3000, () => {
    console.log(`Server is listening on port 3000...`)
})