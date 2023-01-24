const mongoose = require('mongoose')
const Row = mongoose.Schema({
    numberOfRow:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("row",Row)

