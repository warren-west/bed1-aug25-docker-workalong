class GenreService {
    constructor(db) {
        this.db = db
        this.Genre = db.Genre
        this.Band = db.Band
    }

    async getAllGenres() {
        return this.Genre.findAll({ include: this.Band })
    }

    async getGenreById(id) {
        return this.Genre.findByPk(id, { include: this.Band })
    }

    async addGenre(description) {
        return this.Genre.create({ description })
    }

    async populateWithSeedData() {
        const { count } = await this.Genre.findAndCountAll()
        console.log(`${count} genres.`)

        if (count === 0) {
            return await this.Genre.bulkCreate([
                { description: 'Metal' },
                { description: 'Folk' },
                { description: 'Hiphop' },
                { description: 'Pop' },
                { description: 'Jazz' },
                { description: 'Classical' },
                { description: 'Deathcore' },
            ])
        }

        return null // no DB population happened
    }

    async updateGenre(id, description) {
        return this.Genre.update({ description }, { where: { id } })
    }

    async deleteGenre(id) {
        return this.Genre.destroy({ where: { id } })
    }
}

module.exports = GenreService