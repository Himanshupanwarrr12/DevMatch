import express from 'express'
const userRouter =  express.Router()

userRouter.get("user/feed", async (req,res)=>{
    try {
        
        
    } catch (error:unknown) {
        res.status(400).send("Error : "+ error)
    }
})


export default userRouter