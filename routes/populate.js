const router = require('express').Router()
const db = require('../models')
// Import service classes
const GenreService = require('../services/GenreService')
const BandService = require('../services/BandService')
const MemberService = require('../services/MemberService')
// Instantiate service objects
const genreService = new GenreService(db)
const bandService = new BandService(db)
const memberService = new MemberService(db)

// POST /populate
router.post('/', async (req, res) => {
    console.log('Populating the DB...')
    try {
        // populate genres with genreService
        const genrePopulateResult = await genreService.populateWithSeedData()
        
        // populate bands with bandService
        const bandPopulateResult = await bandService.populateWithSeedData()
        
        // populate members with memberService
        const memberPopulateResult = await memberService.populateWithSeedData()
        
        let message = `Populated DB with ${genrePopulateResult.length} genres, ${bandPopulateResult.length} bands, and ${memberPopulateResult.length} members.`

        res.status(201).json({ status: 'success', message })
        return

    } catch (error) {
        res.status(500).json({ status: "fail", message: "Failed populating the DB. ❌" })
        return
    } finally {
        console.log('Population attempt completed.')
    }
})

module.exports = router