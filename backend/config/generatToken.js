const jwt = require('jsonwebtoken');

let generateToken = (id)=>{
    // return jwt.sign(id.toJSON(), process.env.JWT_SECRET, {
    //     expiresIn: '60d',
    // })
    // jwt.sign( id.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 * 60});
    return jwt.sign(id.toJSON(), "webpro", {
        expiresIn: '24h' // expires in 24 hours
    });
}

module.exports = generateToken;