const jwt = require('jsonwebtoken')

module.exports =async(req,res,next) =>{
    // get the token from the headers object

    const token = req.header('x-auth-token')

    if(!token){
        return res.json('No Token Access denied')
    }

    try {
        
        const decoded = jwt.verify(token,process.env.SECRET_KEY)

        console.log(decoded)

        next()
    } catch (error) {
        res.status(400).json('Token not valid')
    }
}