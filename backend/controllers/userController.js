const asyncHandler = require('express-async-handler');
const userModal = require('../modal/userModal');
const generateJWTToken = require('../config/generatToken');

// registration function
const userRegistration = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { name, email, password, picture } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Fill all fields");
    }

    // find email if it is exist or not 
    const isUserExist = await userModal.findOne( {email} );

    if(isUserExist){
        res.status(400);
        throw new Error("email already exist");
    }

    const user = await userModal.create({
        name,
        email,
        password,
        picture
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            token: generateJWTToken(user._id)
        })
    }else{
        res.status(400); 
        throw new Error('user not create.')
    }
})

// login function 
const userLogin = asyncHandler(async (req, res)=>{
    const { email, password } = req.body;

    const user = await userModal.findOne( {email} )

    if(user && user.matchPass(password)){
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            token: generateJWTToken(user._id)
        })
    }
    else{
        res.status(400); 
        throw new Error('user not available.')
    }
})

module.exports = { userRegistration, userLogin } 