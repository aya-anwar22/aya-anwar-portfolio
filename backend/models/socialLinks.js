const mongoose = require('mongoose');
const socialLinksSchema = new mongoose.Schema({
    platform: String,
    url: String
})
const SocialLinks = mongoose.model('SocialLinks',socialLinksSchema )
module.exports = SocialLinks