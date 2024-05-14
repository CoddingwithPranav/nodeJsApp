const mongoose = require('mongoose');
require('dotenv').config();

//Define the mongoDB connection URL

// const mongoUrl = process.env.MONGODB_URL_LOCAL /// Replace 'db' if you have another database 
const mongoUrl = process.env.MONGODB_URL


//Set Up MongoDB connection
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


//Get Default connection

const db = mongoose.connection;


db.on('connected', ()=>{
    console.log("Connected to MongoDB")
})
db.on('error', (err)=>{
    console.log("Error in MongoDB", err)
})
db.on('disconnected', ()=>{
    console.log("MongoDB Disconnected")
})


module.exports = db;
