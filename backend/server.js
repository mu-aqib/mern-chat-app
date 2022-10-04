const express = require('express'); 
const dotenv = require('dotenv');
const chats  = require('./data/data')

const app = express();
dotenv.config();

app.get('/', (req, res)=>{
    res.send("Welcome to home page")
} )

app.get('/chats', (req, res)=>{
    res.send(chats)
} ) 

app.get('/chats/:id', (req, res)=>{
    const id = req.params.id;
    let chat = chats.find(chat=>{
        return chat._id === id;
    })
    res.send(chat)
} ) 

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log("now server has been started on port " + PORT)) 