const expressAsyncHandler = require("express-async-handler");
const Chat = require("../modal/chatModal");
const User = require("../modal/userModal");

// single chat creation
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
    // select user of given last message
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

// fetch chats...
const fetchChats = expressAsyncHandler( async (req, res)=>{
    try{
        let allChats = await Chat.find({
            users: {$elemMatch : {$eq: req.user._id}}
        })
        .populate('users', '-password')
        .populate('GroupAdmin', '-password')
        .populate('lastMessage')
        .sort({updatedAt: -1})

        allChats = await User.populate(allChats, {
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

// create group chat
const creatGroupChat = expressAsyncHandler(async (req,res)=>{
    // if data empty then show res
    if(!req.body.users && !req.body.name){
        return res.status(400).send({err: "Please fill all the fields. Chats not created"})
    }

    // if chat user less than 2 
    const users = JSON.parse(req.body.users)

    if(users.length < 2) {
        return res.status(400).send({err: "Minimum 2 users required to create group chat"})
    }

    // push loggedIn user in the given array
    users.push(req.user);

    try{
        const creatGroupChat = await Chat.create({
            chatName : req.body.name,
            users: users,
            isGroupChat: true,
            GroupAdmin: req.user
        })

        const fullGroupChat = await Chat.findOne({
            _id: creatGroupChat._id
        })
        .populate('users', '-password')
        .populate('GroupAdmin', '-password')

        res.status(200).json(fullGroupChat);
    }
    catch(err){
        res.status(400)
        throw new Error(err.message + " chat group error ")
    }
})

// rename group name
const renameGroup = expressAsyncHandler(async (req, res)=>{
    const {chatName, chatId} = req.body;

    const updateName = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        {
            new: true,
        }
    )
    .populate("users", "-password")
    .populate("GroupAdmin", "-password");

    if (!updateName) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updateName);
    } 

})

// remove user from group
const removeUserFromGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, uid } = req.body;
  
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: uid },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("GroupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
});

const addUserToGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, uid } = req.body;
  
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: uid },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("GroupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
});

module.exports = {createChat, fetchChats, creatGroupChat, renameGroup, removeUserFromGroup, addUserToGroup} 