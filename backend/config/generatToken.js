const jwt = require('jsonwebtoken');

// const expiry_date = 1*24*60*60; // 1day
let generateToken = (id)=>{
    // const secret_key = process.env.JWT_SECRET;
    
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '2d'
    });
    
}

module.exports = generateToken;
