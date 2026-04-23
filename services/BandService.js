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

    async updateBand(id, name, GenreId) {
        return this.Band.update({ name, GenreId }, { where: { id } })
    }

    async deleteBand(id) {
        return this.Band.destroy({ where: { id } })
    }
}

module.exports = BandService