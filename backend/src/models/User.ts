import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Schema, model, Document, type ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  age: number;
  gender: string;
  skills: string[];
  about: string;
  photoUrl: string;
  getJWT(): Promise<string>
  isValidPassword(password:string):Promise<boolean>,
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 12,
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
      validate: function isValidEmail(email: string) {
        return validator.isEmail(email);
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: function isStrongPassword(value: string) {
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
      validate: {
        validator: Number.isInteger,
        message: "{value} is not an integer",
      },
    },
    skills: {
      type: [String],
      required: false,
    },
    about: {
      type: String,
      default: "default description",
      required: false,
    },
    photoUrl: {
      type: String,
      default:
        "https://i0.wp.com/fdlc.org/wp-content/uploads/2021/01/157-1578186_user-profile-default-image-png-clipart.png.jpeg?fit=880%2C769&ssl=1",
      required: false,
    },
  },
  { timestamps: true }
);

// adding getJwt method to userSchema
userSchema.methods.getJWT = async function (this: IUser): Promise<string> {
  const user = this
  const secretKey = process.env.JWT_SECRET 
  if(!secretKey){
    throw new Error("JWT_SECRET is required")
  }
  const token = jwt.sign({id:user.id}, secretKey, {expiresIn: "7d" })
  return token;
};

//adding validatePassword to userSchema
userSchema.methods.isValidPassword = async function (this:IUser,
  passByInputUser: string
): Promise<boolean> {
  const user = this
  return await bcrypt.compare(passByInputUser, user.password);
};

export default model<IUser>("User", userSchema);
