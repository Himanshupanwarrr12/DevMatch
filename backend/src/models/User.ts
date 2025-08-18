import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

import {Schema,model,Document} from "mongoose"

 export interface User extends Document{
    firstName:string;
    lastName : string;
    emailId:string; 
    password: string;
    age:number;
    gender:string;
    skills:string[];
    about:string;
    photoUrl:string;
    createdAt:Date;
    updatedAt : Date;
}

const UserSchema : Schema<User> = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxlength:12,
    },
     lastName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 12,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: function isValidEmail(email:string) {
        return validator.isEmail(email);
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: function isStrongPassword(value:string) {
        return validator.isStrongPassword(value);
      },
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
      max: 100,
      validator: Number.isInteger,
    },
    skills: {
      type: String,
      required:false,
    },
    about: {
      type: String,
      default: "default description hai",
      required:false
    },
    photoUrl: {
      type: String,
      default:"https://i0.wp.com/fdlc.org/wp-content/uploads/2021/01/157-1578186_user-profile-default-image-png-clipart.png.jpeg?fit=880%2C769&ssl=1",
      required:false
    }  
})

