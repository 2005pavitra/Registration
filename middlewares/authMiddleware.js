const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({
            msg:"access denied"
        })

    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
        
    } catch (error) {
        res.status(400).json({
            msg:"Invalid token"
        })
    }
}