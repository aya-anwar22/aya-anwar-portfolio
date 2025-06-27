const mongoose = require('mongoose');
const educationSchema =  new mongoose.Schema({
    educationName: String,
    program:String,
    startDate: String,
    endDate: String,
    description:String
})
const Education = mongoose.model('Education',educationSchema)
module.exports = Education