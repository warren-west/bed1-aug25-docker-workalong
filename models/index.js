require('dotenv').config()
const { Sequelize, DataTypes, STRING } = require('sequelize')

// Create a new sequelize connection with the
// connection info from Aiven.io
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_NAME,
    logging: false,
})

// initialize the db "wrapper" object
const db = {}
db.sequelize = sequelize // attach sequelize object to db wrapper

// Define the Band table
db.Band = sequelize.define("Band", {
    name: {
        allowNull: false,
        defaultValue: "Unknown",
        type: DataTypes.STRING(100),
        unique: true,
    },
}, {
    timestamps: false
})

// Define the Member table
db.Member = sequelize.define("Member", {
    fullname: {
        allowNull: false,
        defaultValue: "Ola Nordman",
        type: DataTypes.STRING(120),
        unique: true,
    },
    mainInstrument: {
        allowNull: false,
        defaultValue: "Unknown",
        type: DataTypes.STRING(120),
    }
}, {
    timestamps: false
})

// Define the Genre table
db.Genre = sequelize.define("Genre", {
    description: {
        allowNull: false,
        defaultValue: "Unknown",
        type: DataTypes.STRING(120),
        unique: true,
    }
}, {
    timestamps: false
})

// Create a User model, without any associations
db.User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { // Sequelize validators are great
            len: {
                args: [4, 100],
                msg: 'Username should be between 4 and 100 characters long.'
            } 
        }
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'Email is not a valid email address.'
            }
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [4, 100] // you can set a min length for a password
        }
    },
    role: {
        type: DataTypes.ENUM(['ADMIN', 'MEMBER']), // enumerator [0: ADMIN, 1: MEMBER]
        defaultValue: "MEMBER",
        allowNull: false
    }
}, {
    timestamps: false
})

// Set up associations
// 1-m (Band-Member)
db.Member.belongsTo(db.Band)
db.Band.hasMany(db.Member)

// 1-m (Genre-Band)
db.Band.belongsTo(db.Genre)
db.Genre.hasMany(db.Band)

module.exports = db