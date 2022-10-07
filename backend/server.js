const express = require('express'); 
const dotenv = require('dotenv');
const chats  = require('./data/data')
const dbConnection = require('./config/db');

const useUserRoute = require('./routes/userRoutes')

const app = express();
dotenv.config();
dbConnection();

app.get('/', (req, res)=>{
    res.send("Welcome to home page")
} )

app.use('/api/user', useUserRoute)

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log("now server has been started on port " + PORT)) 