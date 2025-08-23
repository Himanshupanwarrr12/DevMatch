import validator from 'validator'
import type { Request } from 'express'

export  function validateSignUpData(req:Request){
    const {firstName,emailId,password} = req.body
    console.log("req.body : ",req.body)
    if(!firstName || typeof firstName !== 'string' || firstName.trim().length === 0){
        throw new Error("First Name is required and must be a  non-empty string.")
    }
    if(!emailId || !validator.isEmail(emailId)){
        throw new Error("valid email is required ")
    }
    if( !password || !validator.isStrongPassword(password)){
        throw new Error("Password must be strong.")
    }

}

export  function validateProfileEditData(req:Request){}