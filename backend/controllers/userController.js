
const asyncHandler = require('express-async-handler');
const userModal = require('../modal/userModal');
const generateJWTToken = require('../config/generatToken');
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true
});

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
            message: "User Registered Successfully"
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
    if(user && await user.matchPass(password)){
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            picture: user.picture,
            token: generateJWTToken(user._id)
        })
    }
    else{
        res.status(400); 
        throw new Error('Please entre a valid informations')
    }
})

const getAllUsers = asyncHandler( async (req, res)=>{
    const keyword = req.query.filter
    ?   {
            $or : [
                { name: { $regex: req.query.filter, $options: 'i' } },
                { email: { $regex: req.query.filter, $options: 'i' } } 
            ]
        }
    :   {};
    // console.log(keyword, " keyword")
    const users = await userModal.find(keyword).find({_id: {$ne: req.user._id}});
    
    res.send(users)
} )


const uploadCloudinaryFile = async (req,res)=>{
    const {group_img} = req.files
    try{

        cloudinary.uploader.upload(group_img.tempFilePath, (err, result)=>{
            console.log(result)
        });                  

        res.send("result");
    }
    catch(err){         
        console.log(err)
    }                    

}

module.exports = { userRegistration, userLogin, getAllUsers, uploadCloudinaryFile }