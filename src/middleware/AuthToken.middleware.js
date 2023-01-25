const jwt = require('jsonwebtoken')

const AuthToken=()=>{ 
    return (req,res,next)=>{
        console.log("token working")
    try {
        const  token  = req.headers.authorization
        if(!token){
            return res.status(401).send({error:"Access denied"})
        }
        const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY)
         req.user_id=id
         console.log('req user id',req.user_id)
         return next()
    } catch (error) {
        console.log(error)
    }
} 
}
exports.AuthToken = AuthToken