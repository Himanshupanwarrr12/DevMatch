import Jwt, { type JwtPayload } from 'jsonwebtoken'
import User from '../models/User'
import type { Request,Response, NextFunction } from 'express'

interface authenticationRequest extends Request{
    user?:any
}

const userAuth = async (req:authenticationRequest,res:Response,next:NextFunction)=>{
try {
    // first i will take token from the user
    const token =  req.cookies?.token;
    if(!token){ 
        res.status(400).send("Please login")
    }
    // 2nd i will take the secret key from the .env file
    const secret = process.env.JWT_SECRET
    if(!secret){ 
        throw new Error("JWT_SECRET variable is not defined")
    }

    // now i am making a custom interface for adding string as string in it
    interface customJwtPayload extends JwtPayload{
        _id:string;
    }

    //3rd i will verify the user 
    const decodedData = Jwt.verify(token,secret) as customJwtPayload

    // console.log(decodedData)
    
    // now i will take id from the decodedData
    const {_id} = decodedData;

    // now i will find the user with id and send it to the user
    const user = User.findOne({id:_id})
    if(!user){
        throw new Error("user not found")
    }
    req.user= user
    next()
} catch (error:unknown) {
    res.status(400).send("Error"+error)
}
}

export default userAuth