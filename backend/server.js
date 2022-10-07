const express = require('express'); 
const dotenv = require('dotenv');
const dbConnection = require('./config/db');

const useUserRoute = require('./routes/userRoutes')

dotenv.config();
dbConnection();

const app = express();
app.use(express.json())
// use useUserRoute as middleware for registration and login
app.use('/api/user', useUserRoute);

app.get('/', (req, res)=>{
    res.send("Welcome to home page")
} )

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log("now server has been started on port " + PORT)) 