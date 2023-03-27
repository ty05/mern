const express = require('express')
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const { connectDB } = require('./config/db')
const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const app = express()

connectDB();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res)=>{
    res.status(200).json({'message': "Welcome to our Support Desk!"})
})

app.use("/api/users", require('./routes/userRoutes'))
app.use("/api/ticket", require('./routes/ticketRoutes'))

app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`Port is running on ${PORT}`)
})