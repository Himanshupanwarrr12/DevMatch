import express from 'express'
const profileRouter =  express.Router()
import userAuth from '../middleware/auth'
import type { Request,Response } from 'express'
import type { User } from '../models/User'


interface profileViewRequest extends Request{
    user?:User
}

profileRouter.get("/profile/view", userAuth  ,async (req:profileViewRequest,res:Response)=>{
    try {
        const user = req.user
        res.send(user)

    } catch (error:unknown) {
        res.status(400).send("Error : "+ error)
    }
})


profileRouter.patch("/profile/edit", userAuth , async(req:profileViewRequest,res:Response) =>{
    try {
        
    } catch (error) {
        res.status(400).send("Error : "+ error)
        
    }
})

export default profileRouter