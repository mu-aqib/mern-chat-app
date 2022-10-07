const jwt = require('jsonwebtoken');

let generateToken = (id)=>{
    const secret_key = process.env.JWT_SECRET;
    // return jwt.sign(id.toJSON(), process.env.JWT_SECRET, {
    //     expiresIn: '60d',
    // })
    // jwt.sign( id.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 * 60});
    return jwt.sign({id}, secret_key, {
        expiresIn: 140000000003
    });
}

module.exports = generateToken;