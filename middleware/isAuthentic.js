const jwt =require('jsonwebtoken')

const isAuthentic=async(req,res,next)=>{
    try{

        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({msg:"user is not authentic"}) 
        }
        console.log(token)
        const decode=await jwt.verify(token,process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({msg:"Invalid Token"})
        }
        console.log(decode.userId)
        req._id=decode.userId
        next();

    }
    catch(err){
        return res.status(500).json({ msg: "Internal Server Error" })

    }

}
module.exports={isAuthentic}