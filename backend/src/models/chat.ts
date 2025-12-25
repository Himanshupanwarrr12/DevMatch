import mongoose, { model, Schema, Document, Types } from "mongoose"

interface IMessage {
    senderId: Types.ObjectId;
    text: string;
}

interface IMessageDocument extends IMessage, Document {
    _id: Types.ObjectId;
}

interface IChat extends Document {
    participants: Types.ObjectId[];
    messages: IMessageDocument[];
}

const messageSchema = new Schema<IMessage>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true,
    },
})

const chatSchema = new Schema<IChat>({
    participants: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
    ],
    messages: [messageSchema],
})

export default model<IChat>("chat", chatSchema)