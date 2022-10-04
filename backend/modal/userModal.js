const mongoose = require('mongoose');

const user = mongoose.Schema({
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        picture: {
            type: String, require: true, default: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", user);
module.exports = User;