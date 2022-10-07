const { json } = require('express');
const userModal = require('../modal/userModal')

const userRegistration = async (req, res) => {
    // console.log(req.body);
    const { name, email, password, pic } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Fill all fields");
    }

    const isUserExist = await userModal.findOne( {email} );

    if(isUserExist){
        res.status(400);
        throw new Error("email already exist");
    }

    const user = await userModal.create({
        name,
        email,
        password,
        pic
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic
        })
    }else{
        res.status(400);
        throw new Error('user not create.')
    }
}

module.exports = { userRegistration }