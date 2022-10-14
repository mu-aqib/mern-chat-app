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

const fetchChats = expressAsyncHandler( async (req, res)=>{
    try{
        let allChats = await Chat.find({
            users: {$elemMatch : {$eq: req.user._id}}
        })
        .populate('users', '-password')
        .populate('GroupAdmin', '-password')
        .populate('lastMessage')
        .sort({updatedAt: -1})

        allChats = User.populate(allChats, {
            path: 'lastMessage.sender',
            select: 'name picture email'
        })

        res.status(200).send(allChats)
    }
    catch(err){
        res.status(400);
        throw new Error(err.message)
    }
} )

module.exports = {createChat, fetchChats} 