const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PlayersSchema = new Schema({
    name: String,
    country: String,
    sports: String,
    club: String,
    image: String
});

module.exports = mongoose.model('Players', PlayersSchema);