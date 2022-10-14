const expressAsyncHandler = require("express-async-handler");
const Chat = require("../modal/chatModal");

const createChat = expressAsyncHandler( async (req, res)=>{
    const { userID } = req.body;
    
    if(!userID){
        return res.sendStatus(400);
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userID } } },
        ]
    })
} )