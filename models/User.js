const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {isEmail} = require("validator")

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required:[true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum passwod length must be 6 letters'],
    },
    register_date: {
        type: Date,
        default: Date.now,
    }
})