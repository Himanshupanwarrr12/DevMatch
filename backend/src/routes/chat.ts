import express from "express";
import userAuth from "../middleware/auth";
const chatRouter = express.Router();
import type { Request, Response } from "express";
import type { IUser } from "../models/User";
import chat from "../models/chat";

interface chatRequest extends Request {
  user?: IUser;
}

chatRouter.get(
  "/chat/:toUserId",
  userAuth,
  async (req: chatRequest, res: Response) => {
    const { toUserId } = req.params;
    const userId = req.user?._id;

    try {
      let existingChat = await chat.findOne({
        participants: { $all: [userId, toUserId] },
      }).populate({
        path:"messages.senderId",
        select:"firstName lastName"
      })

      if (!existingChat) {
        existingChat = new chat({
          participants: [userId, toUserId],
          messages: [],
        });
      await existingChat.save();
      }
      res.json(existingChat)
    } catch (error) {
      res.status(400).send("Error ;" + error);
    }
  }
);

export default chatRouter;
