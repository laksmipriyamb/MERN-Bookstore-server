const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwtMiddleware");
    //logic to verify token
    //get token - req header
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    //verify token
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
            console.log(jwtResponse);
            req.payload = jwtResponse.userMail
            next()
        } catch (error) {
            res.status(401).json("Authorisation failed!!! Invalid token...")
        }
    } else {
        res.status(401).json("Authorisation failed!!! Token Missing...")
    }

}

module.exports = jwtMiddleware