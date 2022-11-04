const expressAsyncHandler = require('express-async-handler');
const Chat = require('../modal/chatModal');
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
            // instance of the populate
            message = await message.populate("sender", "name picture");
            message = await message.populate("chat");
            message = await User.populate(message, {
                path: 'chat.users',
                select: "name picture email"
            })

            // find givent ID chat and update message content in lastMessage
            await Chat.findByIdAndUpdate(req.body.chatID , {
                lastMessage: message,
            })

            res.json(message)
        }
        catch(err){
            res.status(400);
            throw new Error("Sorry error occured in message " + err.message)
        }
    }
)

const allMessagesByUser = async (req, res)=>{
    console.log(req.params)
    try{
        const messages = await messageModal.find({chat: req.params.chatId})
        .populate("sender", "name picture email")
        .populate("chat")

        res.json(messages)
    }
    catch(err){
        res.status(400);
        throw new Error("Sorry error occured in message " + err.message)
    }
}

module.exports = {creatMessage, allMessagesByUser}