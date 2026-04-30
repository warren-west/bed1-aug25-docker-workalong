const router = require('express').Router()
const db = require('../models')
const MemberService = require('../services/MemberService')
const memberService = new MemberService(db)

// GET /members
router.get('/', async (req, res) => {
    try {
        const result = await memberService.getAllMembers()

        // check for 404 error
        if (!result || result.length === 0) {
            res.status(404).json({ status: 'fail', message: 'No members found.' })
            return
        }

        // we have members to return
        res.json({ status: 'success', data: result })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error.' })
        return
    }
})

// GET /members/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        // validate ID
        if (!id || isNaN(id)) {
            res.status(400).json({ status: 'fail', message: 'Invalid member ID.' })
            return
        }

        const result = await memberService.getMemberById(id)

        // check for 404
        if (!result) {
            res.status(404).json({ status: 'fail', message: `No members found with ID ${id}.` })
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
router.post('/', async (req, res) => {
    const { fullname, mainInstrument, BandId } = req.body

    if (!fullname || !mainInstrument || !BandId) {
        res.status(400).json({ status: 'fail', message: 'Need new member name, main instrument, and band ID.' })
        return
    }

    try {
        const result = await memberService.createMember(fullname, BandId, mainInstrument)

        res.status(201).json({ status: 'success', data: result })
        return

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error.' })
        return
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!id || isNaN(id)) {
            res.status(400).json({ status: 'fail', message: "Invalid member ID" })
            return
        }

        const result = await memberService.deleteMember(id)
        res.json({ status: 'success', message: 'Member successfully deleted.' })
        return
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error.' })
        return
    }

})

module.exports = router