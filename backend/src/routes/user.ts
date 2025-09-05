import express from 'express'
import userAuth from '../middleware/auth'
const userRouter =  express.Router()
import type { Request,Response } from 'express'
import type { IUser } from '../models/User'
import UserConnection from '../models/UserConnection'

interface AuthenticatedRequest extends Request{
user? : IUser
}

const USER_SAFE_DATA= "firstName lastName age about  gender skills "

userRouter.get("/user/requests/recieved",userAuth, async (req : AuthenticatedRequest,res:Response)=>{
try {
    const loggedInUser = req.user

    const connectionReqs = await UserConnection.find({
        toUserId:loggedInUser?._id,
        status:"interested"
    }).populate("fromUserId",USER_SAFE_DATA)

    res.json({
        message:"Data fetched sucessfully",
        data:connectionReqs
    })

} catch (error) {
     res.status(400).json({ 
        message: "Error fetching connection requests",
        error: error instanceof Error ? error.message : "Unknown error"
    });
}
})

userRouter.get("/user/connections", userAuth, async (req:AuthenticatedRequest,res:Response)=>{
    try {
        const loggedInUser = req.user
        console.log("LoggedInUser : ",loggedInUser)

        const connectionRequests = await UserConnection.find({
            $or:[
                {fromUserId: loggedInUser?._id,status:"accepted"},
                {toUserId: loggedInUser?._id,status:"accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA)
          .populate("toUserId",USER_SAFE_DATA)
        
          const connections = connectionRequests.map((connectionRequest) =>{
            const fromUserId = connectionRequest.fromUserId
            const toUserId = connectionRequest.toUserId
            if(fromUserId.toString() === loggedInUser?._id.toString()){
                return toUserId
            }
            return fromUserId
          })
        res.json({connections})
    } catch (error) {
        res.status(400).json({ 
        message: "Error fetching connections",
        error: error instanceof Error ? error.message : "Unknown error"
    });
    }
})

userRouter.get("user/feed", async (req,res)=>{
    try {
        
        
    } catch (error:unknown) {
        res.status(400).send("Error : "+ error)
    }
})


export default userRouter