const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
    name: String,
    category: String,
    size: String,
    quantity: Number
});

module.exports = mongoose.model('Items', ItemsSchema);