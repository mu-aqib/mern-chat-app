const jwt = require('jsonwebtoken');
const userModal = require('../modal/userModal');
const asyncHandler = require('express-async-handler');

const isUserAuhtentic = asyncHandler( async (req, res, next)=>{
    let token = undefined;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try{
            token = req.headers.authorization.split(" ")[1];
            // decode token
            const decode = jwt.decode(token, process.env.JWT_SECRET)
            req.user = await userModal.findById(decode.id).select('-password')
            next()
        }
        catch(err){
            res.status(401);
            throw new Error("Not Authorized, Token not valid")
        }
    }
    
    if(!token){
        res.status(401);
        throw new Error("User Not Authorized")
    }
} )

module.exports = {isUserAuhtentic} 
