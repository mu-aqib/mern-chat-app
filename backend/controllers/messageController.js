const expressHandler = require('express-async-handler');
const messageModal = require('../modal/messageModal');

const creatMessage = (req,res)=>{
    const{ message, chatID } = req.body;
    if(!message && !chatID){
        console.log("error occured !")
        res.sendStatus(400);
    }
    try{
        
    }
    catch(err){
        res.status(400);
        throw new Error("Sorry error occured in message " + err.message)
    }
}

module.exports = {creatMessage}