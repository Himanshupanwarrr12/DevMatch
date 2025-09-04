import mongoose, { Schema, model, Document } from "mongoose";

export interface UserConnection extends Document {
  fromUserId: mongoose.Schema.Types.ObjectId;
  toUserId: mongoose.Schema.Types.ObjectId;
  status: string;
  ConnectionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserConnectionSchema: Schema<UserConnection> = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
    ConnectionDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default model<UserConnection>("userConnection", UserConnectionSchema);
