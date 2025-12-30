import { model, Schema, Document, Types } from "mongoose";

interface IMessage {
  senderId: Types.ObjectId;
  text: string;
  createdAt: Date;
}

interface IChat extends Document {
  participants: Types.ObjectId[];
  messages: IMessage[];
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chatSchema = new Schema<IChat>({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [messageSchema],
});

export default model<IChat>("Chat", chatSchema);
