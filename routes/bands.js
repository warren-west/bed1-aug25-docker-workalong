const router = require('express').Router()
const db = require('../models')

// GET /bands
router.get('/', async (req, res) => {
    try {
        const result = await db.Band.findAll({ include: [ db.Member, db.Genre ] })

        // check for 404 error
        if (!result || result.length === 0) {
            res.status(404).json({ status: 'fail', message: 'No bands found.' })
            return
        }

        // we have bands to return
        res.json({ status: 'success', data: result })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error.' })
        return
    }
})

// GET /bands/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        // validate ID
        if (!id || isNaN(id)) {
            res.status(400).json({ status: 'fail', message: 'Invalid band ID.' })
            return
        }

        const result = await db.Band.findByPk(id, { include: [ db.Member, db.Genre ] })

        // check for 404
        if (!result) {
            res.status(404).json({ status: 'fail', message: `No bands found with ID ${id}.` })
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

// other CRUD

module.exports = router