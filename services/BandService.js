const { Op } = require("sequelize")

class BandService {
    constructor(db) {
        this.db = db
        this.Band = db.Band
        this.Genre = db.Genre
        this.Member = db.Member
    }

    async getAllBands(GenreId, name) {
        // If we have GenreId AND name, then filter results by both
        // If we only have GenreId OR name, then filter by either GenreId OR name
        if (!GenreId && !name) {
            return await this.Band.findAll({ include: [this.Genre, this.Member] })
        }

        const operator = GenreId && name ? Op.and : Op.or

        return this.Band.findAll({
            where: {
                [operator]: [
                    { name: { [Op.substring]: name } },
                    { GenreId: { [Op.eq]: GenreId } },
                ]
            },
            include: [this.Genre, this.Member]
        })
    }

    async getBandById(id) {
        return this.Band.findByPk(id, { include: [this.Genre, this.Member] })
    }

    async createBand(name, GenreId) {
        return this.Band.create({ name, GenreId })
    }

    async populateWithSeedData() {
        const { count } = await this.Band.findAndCountAll()
        console.log(`${count} bands.`)

        if (count === 0) {
            return await this.Band.bulkCreate([
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
        }

        return null // no DB population happened
    }

    async updateBand(id, name, GenreId) {
        return this.Band.update({ name, GenreId }, { where: { id } })
    }

    async deleteBand(id) {
        return this.Band.destroy({ where: { id } })
    }
}

module.exports = BandService