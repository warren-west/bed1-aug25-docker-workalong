require('dotenv').config()
const express = require('express')
const cors = require('cors')
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
const authRouter = require('./routes/auth')

// middleware
app.use(cors()) // enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()) // read json data from req.body
// connect routes
app.use('/students', studentRouter)
app.use('/populate', populateRouter)
app.use('/bands', bandsRouter)
app.use('/members', membersRouter)
app.use('/genres', genresRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.json({
        status: 'success',
        routes: [
            { method: 'POST', endpoint: '/populate' },
            { method: 'POST', endpoint: '/auth/register' },
            { method: 'POST', endpoint: '/auth/login' },
            { method: 'GET', endpoint: '/genres' },
            { method: 'GET', endpoint: '/genres/:id' },
            { method: 'GET', endpoint: '/bands' },
            { method: 'GET', endpoint: '/bands?GenreId=4' },
            { method: 'GET', endpoint: '/bands?name=Ariana' },
            { method: 'GET', endpoint: '/bands?GenreId=4&name=Ariana' },
            { method: 'GET', endpoint: '/bands/:id' },
            { method: 'GET', endpoint: '/members' },
            { method: 'GET', endpoint: '/members/:id' },
        ]
    })
    return
})

const port = process.env.PORT || '3000'

// let server listen
app.listen(3000, () => {
    console.log(`Server is listening on port 3000...`)
})