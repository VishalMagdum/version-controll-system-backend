const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: {
        type: String,
        required: true,
        validate: (value) => validator.isEmail(value)
    },
    mobile: {
        type: String,
        // max: ['10', 'Can not be greater than 10 Number'],
        validate: (value) => { return validator.isNumeric(value) && value.length === 10 }
    },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now() }
},

    {
        collection: 'users',
        versionKey: false
    })

const UserModel = mongoose.model('users', userSchema)
module.exports = { UserModel }