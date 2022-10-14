const expressAsyncHandler = require("express-async-handler");
const Chat = require("../modal/chatModal");
const User = require("../modal/userModal");

const createChat = expressAsyncHandler( async (req, res)=>{
    const { userId } = req.body;

    if(!userId){
        return res.sendStatus(400);
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
    .populate("users", "-password")
    .populate("lastMessage");
    
    isChat = await User.populate(isChat, {
        path: "lastMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        console.log("chat available")
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
        
} )

module.exports = {createChat} 