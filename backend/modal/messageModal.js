const mongoose = require('mongoose');

const message = mongoose.Schema({
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        conent: {
            type: String,
            trim: true
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        },
    },
    {
        timestamps: true
    }
)

const Message = mongoose.model("Message", message);
module.exports = Message;