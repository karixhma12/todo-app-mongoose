const jwt = require("jsonwebtoken");
const JWT_SECRET = "ilovekiara";

function auth(req,res,next){
    const token = req.headers.authorization;
    const response = jwt.verify(token,JWT_SECRET);
    if(!response){
        return res.status(403).send({message : "Incorrect credentials!"}); 
    }
    else{
        req.userId = response.id;
        next();
    }
}


module.exports = {
    auth,
    JWT_SECRET
}