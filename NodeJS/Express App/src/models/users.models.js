const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: String,
    name: String,
    mobileNumber: Number,
    role: String
});

module.exports = mongoose.model('Users', UserSchema);