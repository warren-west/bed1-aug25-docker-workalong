class AuthService {
    constructor(db) {
        this.User = db.User
    }

    async getAllUsers() {
        return this.User.findAll()
    }

    async getUserByUsername(username) {
        return this.User.findOne({ where: { username } })
    }

    async createUser(username, email, hashedPassword) {
        return this.User.create({ username, email, password: hashedPassword })
    }
}

module.exports = AuthService