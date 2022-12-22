const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: String,
    firstName: String,
    lastName: String,
    mobileNumber: Number,
    password: String,
    role: String
});

module.exports = mongoose.model('Users', UserSchema);