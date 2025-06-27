const mongoose = require('mongoose');
const skillSchema = new mongoose.Schema({
    title: String,
    items: [String]
})
const Skill = mongoose.model('Skill',skillSchema )
module.exports = Skill