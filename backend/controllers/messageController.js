const expressAsyncHandler = require('express-async-handler');
const messageModal = require('../modal/messageModal');
const User = require('../modal/userModal');

const creatMessage = expressAsyncHandler(
    async (req,res)=>{
        const{ message, chatID } = req.body;
    
        if(!message && !chatID){
            console.log("error occured !")
            res.sendStatus(400);
        }
    
        let newMessage = {
            sender: req.user._id,
            content: message,
            chat: chatID
        }
    
        try{
            let message = await messageModal.create(newMessage);
    
            message = await message.populate("sender", "name pic").execPopulate();
            message = await message.populate("chat").execPopulate();
            message = await User.populate(message, {
                path: 'chat.users',
                select: "name pic email"
            })
        }
        catch(err){
            res.status(400);
            throw new Error("Sorry error occured in message " + err.message)
        }
    }
)

module.exports = {creatMessage}