const router = require('express').Router()
const db = require('../models')
const GenreService = require('../services/GenreService')
const genreService = new GenreService(db)

// GET /genres
router.get('/', async (req, res) => {
    try {
        const result = await genreService.getAllGenres()

        // check for 404 error
        if (!result || result.length === 0) {
            res.status(404).json({ status: 'fail', message: 'No genres found.' })
            return
        }

        // we have genres to return
        res.json({ status: 'success', data: result })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error.' })
        return
    }
})

// GET /genres/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        // validate ID
        if (!id || isNaN(id)) {
            res.status(400).json({ status: 'fail', message: 'Invalid genre ID.' })
            return
        }

        const result = await genreService.getGenreById(id)

        // check for 404
        if (!result) {
            res.status(404).json({ status: 'fail', message: `No genres found with ID ${id}.` })
            return
        }

        // we can successfully return a member
        res.json({ status: 'success', data: result })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error.' })
        return
    }
})

// POST /genres
router.post('/', async (req, res) => {
    const { description } = req.body

    // validate description
    if (!description) {
        res.status(400).json({ status: 'fail', message: 'Invalid genre description.' })
        return
    }

    try {
        const result = await genreService.addGenre(description)

        res.status(201).json({ status: 'success', data: result })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error.' })
        return
    }

})

// other CRUD

module.exports = router