const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    userName: String,
    firstName: String,
    lastName: String,
    mobileNumber: Number,
    password: String,
    role: String
});

//generate encrypted password for register api
UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//validate the password string with encrypted password stored in the mongodb
UserSchema.methods.validatePassword = function (password) {
    const result = bcrypt.compareSync(password, this.password);
    return result;
}


module.exports = mongoose.model('Users', UserSchema);