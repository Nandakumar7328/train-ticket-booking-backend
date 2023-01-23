const mongoose = require('mongoose')
const Passenger = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    seatNumber:{
        type:Number,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    agentId:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model("passenger",Passenger)

