const router = require('express').Router()
const db = require('../models')

// POST /populate
router.post('/', async (req, res) => {
    console.log('Populating the DB...')
    try {
        let message = ''

        // check to see if tables contain data
        const { countGenre } = await db.Genre.findAndCountAll()
        if (countGenre === 0) {
            await db.Genre.bulkCreate([
                { description: 'Metal' },
                { description: 'Folk' },
                { description: 'Hiphop' },
                { description: 'Pop' },
                { description: 'Jazz' },
                { description: 'Classical' },
                { description: 'Deathcore' },
            ])
            message += `Genre table populated with data. ✅`
        }
        
        const { countBand } = await db.Band.findAndCountAll()
        
        if (countBand === 0) {
            await db.Band.bulkCreate([
                { name: 'Metallica', GenreId: 1 },
                { name: 'Eric Clapton', GenreId: 2 },
                { name: 'Eminem', GenreId: 3 },
                { name: 'Drake', GenreId: 3 },
                { name: 'Ariana Grande', GenreId: 4 },
                { name: 'The Weeknd', GenreId: 4 },
                { name: 'Flying Lotus', GenreId: 5 },
                { name: 'Django Reinhart', GenreId: 5 },
                { name: 'Wolfgang Motzart', GenreId: 6 },
                { name: 'Edvard Grieg', GenreId: 6 },
                { name: 'Max Richterach', GenreId: 6 },
                { name: 'Suicide Silence', GenreId: 7 },
                { name: 'Bring me the Horizon', GenreId: 7 },
                { name: 'Whitechapel', GenreId: 7 },
            ])
            message += `\nBand table populated with data. ✅`
        }
        
        
        
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