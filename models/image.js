const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    name: {type: String},
    desc: {type: String},
    img:
    {
        data: Buffer,
        contentType: String
    }
})

const IMAGE = mongoose.model('Image', imageSchema)

module.exports = IMAGE