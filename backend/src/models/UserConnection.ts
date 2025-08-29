import mongoose, { Schema, model, Document, mongo } from "mongoose";

export interface UserConnection extends Document {
    fromUserId:mongoose.Schema.Types.ObjectId
    toUserId : mongoose.Schema.Types.ObjectId
    status:string
    createdAt:Date
    updatedAt:Date
}

const UserConnectionScehma  : Schema<UserConnection> = new Schema({
    fromUserId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    }
},{
    timestamps:true
}

)

export default model<UserConnection>("userConnectionSchema",UserConnectionScehma)