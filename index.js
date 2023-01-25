const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const SuperUser = require('./modelSuperUser')
const Agent = require('./modelAgent')
const Passenger = require('./modelTicket')
const AgentDetails = require('./modelAgentDetails')
const Row = require('./modelN')
const { request, response } = require('express')
const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://NandaKumar:Nanda7328@cluster0.9j7nchf.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log("DB Connected .....!")
).catch(err => console.log(err,"DB"))
const port = process.env.PORT || 3010

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/login-super-admin',async(request,response) => {
    const {password,email} = request.body 
    try{
        const supeUser = await SuperUser.find()
        let loginResult = false
        let ID = null
        supeUser.map(eachData => {
            if (eachData.password === password && eachData.email === email){
                 loginResult = true
                 ID = eachData.id
            }
        }) 

        if (loginResult === true){
            response.send({status:true,msg:"login successfull",ID:ID})
        }
        else{
            response.send({status:false,msg:"password or eamil wrong"})
            response.status(400)
        }
    }
    catch(err){
        console.log(err.message)
    }
})

app.get('/get-admin-details',async(request,response) => {
    try{
        const getSuperAdmin = await SuperUser.find()
        response.send(getSuperAdmin)
    }
    catch(err){
         console.log(err.message)
    }
})


app.post('/create-agent',async(request,response) => {
    const {id,email,password,limit} = request.body 
    try{
       const getAgentEmail = await Agent.find()
       let resultAgent = false
       getAgentEmail.map(eachAgent => {
        if (eachAgent.email === email){
            resultAgent = true
        }
       })
       if (resultAgent === true ){
        response.send({status:false,msg:"Agent already exist"})
        response.status(400)
       }
       else{
        const newAgent = new Agent({id,email,password,limit})
        await newAgent.save()
        response.send({status:true,msg:"Agent add success"})
       }
    }
    catch(err){
        console.log(err.message)
    }
})

app.post('/login-agent',async(request,response) => {
    const {password,email} = request.body 
    try{
        const agent = await Agent.find()
        let loginResult = false
        let ID = null
        let limit = null 
        agent.map(eachData => {
            if (eachData.password === password && eachData.email === email){
                 loginResult = true 
                 ID = eachData.id
                 limit = eachData.limit
            }
        }) 

        if (loginResult === true){
            response.send({status:true,msg:"login successfull",ID:ID,limit:limit})
        }
        else{
            response.send({status:false,msg:"password or eamil wrong"})
            response.status(400)
        }
    }
    catch(err){
        console.log(err.message)
    }
})

app.post('/book-ticket',async(request,response) => {
    const {name,age,seatNumber,id,agentId,gender} = request.body
    try{
       const book = new Passenger({name,age,seatNumber,id,agentId,gender})
       await book.save()
       response.send({status:true,msg:"Booking success"})
    }
    catch(err){
        console.log(err.message)
    }
})

app.delete('/delete-agent/:id',async(request,response) => {
    const{id} = request.params
    try{
        await Agent.findOneAndDelete({id:id})
        response.send({status:true,msg:"Agent Delete success"})
    }
     catch(err){
            console.log(err.message)
        }
    
})

app.get('/get-all-booking',async(request,response) => {
    try{
        const getAllBooking = await Passenger.find()
        response.send(getAllBooking)
    }
    catch(err){
         console.log(err.message)
    }
})

app.get('/get-booking-agent/:id' ,async(request,response)=> {
    const {id} = request.params 
    try{
        const agentBooking = await Passenger.find({agentId:id})
        response.send(agentBooking)
    }
    catch(err){
        console.log(err.message)
    }
})

app.post('/add-agent-details',async(request,response) =>{
       const {name,dateOfBirth,phonenumber,address,profilePic,id} = request.body
    try{

        const agentPersonel = new AgentDetails({name,dateOfBirth,phonenumber,address,profilePic,id})
       await agentPersonel.save()
       response.send({status:true,msg:"Details Add success"})

    }
    catch(err){
        console.log(err.message)
    }
})

app.get('/get-agent-details/:id',async (request,response) => {
    const {id} = request.params
    try{
        const agentpersonelDetails = await AgentDetails.find({id:id})
        response.send(agentpersonelDetails)
    }
    catch(err){
        console.log(err.message)
    }
})

app.put('/add-row',async(request,response) =>{
    const {numberOfRow} = request.body
 try{

     await Row.updateOne({numberOfRow:numberOfRow})
    response.send({status:true,msg:"row Add Success"})

 }
 catch(err){
     console.log(err.message)
 }
})

app.get('/get-row',async(request,response) => {
    try{
       const getRow = await Row.find()
       let rowNum = null
       getRow.map(eachRow => {
        if (eachRow.numberOfRow){
           rowNum = eachRow.numberOfRow
        }

       })
       response.send({status:true,rownum:rowNum})
    }
    catch(err){
        console.log(err.message)
    }
})
