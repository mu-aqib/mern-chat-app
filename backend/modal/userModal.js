const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
        },
        picture: {
            type: String, default: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"
        }
    },
    {
        timestamps: true
    }
)

// defining methods to compare password wiht decrypted password
userSchema.methods.matchPass = async function (enteredPass){
    return await bcrypt.compare(enteredPass, this.password);
};


// middleware which execute before saving schema execution response
userSchema.pre('save', async function (next){
    if (!this.isModified) next();

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);

module.exports = User;