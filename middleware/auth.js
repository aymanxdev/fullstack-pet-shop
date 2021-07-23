const jwt = require("jsonwebtoken")
const config = require("config")

function auth (req, res, next) {
    const token = req.header('x-auth-token')

    //check if token exists 
    if(!token) {
        return res.status(400).json({msg:"No token. Authorisation denied"})
    }
    //verify token 
    try {
        const decoded = jwt.verify(token, config.get('jwtsecret'))
    
    // verificatio success then add user from payload
        req.user = decoded;
        next();
    }
    catch(error){

        res.status(400).json({msg: "Token is not valid"})
    }

}

module.exports = auth;
