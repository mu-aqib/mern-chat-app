const mongoose = require('mongoose');

const chatModal = mongoose.Schema({
        chatName: {
            type: String,
            trim: true
        },
        isGroupChat: {
            type: Boolean,
            default: false
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        GroupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },

    {
        timestamps: true
    }

)

const Chat = mongoose.model("Chat", chatModal);
module.exports = Chat;