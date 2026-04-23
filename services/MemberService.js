class MemberService {
    constructor(db) {
        this.db = db
        this.Member = db.Member
    }

    async getAllMembers() {
        return this.Member.findAll({ include: this.db.Band })
    }

    async getMemberById(id) {
        return this.Member.findByPk(id, { include: this.db.Band })
    }

    async createMember(fullname, bandId, mainInstrument) {
        return this.Member.create({ fullname, bandId, mainInstrument })
    }

    // un-tested
    async populateWithSeedData() {
        const { count } = await this.Member.findAndCountAll()
        console.log(`${count} members.`)

        if (count === 0) {
            return await this.Member.bulkCreate([
                { fullname: "Lars Ulrik", mainInstrument: "Drums", BandId: 1 },
                { fullname: "James Mattfield", mainInstrument: "Vocals", BandId: 1 },
                { fullname: "Kirk Hammet", mainInstrument: "Guitar", BandId: 1 },
                { fullname: "Robert Rohiho", mainInstrument: "Guitar", BandId: 1 },
                { fullname: "Mitch Lucker", mainInstrument: "Vocals", BandId: 12 },
                { fullname: "Alex", mainInstrument: "Drums", BandId: 12 },
                { fullname: "Oli Sykes", mainInstrument: "Vocals", BandId: 13 },
                { fullname: "Matt Nicholls", mainInstrument: "Drums", BandId: 13 },
            ])
        }
        return null // no DB population happened
    }

    async updateMember(id, fullname, bandId, mainInstrument) {
        return this.Member.update({ fullname, bandId, mainInstrument }, { where: { id } })
    }

    async deleteMember(id) {
        return this.Member.destroy({ where: { id } })
    }
}

module.exports = MemberService