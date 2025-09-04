import express from "express";
import userAuth from "../middleware/auth";
const requestRouter = express.Router();
import type { Request, Response } from "express";
import type { UserConnection } from "../models/UserConnection";
import User from "../models/User";
import UserconnectionModel from '../models/UserConnection'


// 1. get all required things 2. only allowed request will send(interested,ignored) 3.check the toUser is valid or not 4.declare new connection by connectionSchema 5 .check user not to send request himself 6. check if user already send request then he can't send again or check if the toUser didn't have pending req to fromUser 6.now finally you can save the connection req .

interface sendConnectionRequest extends Request {
  user?: UserConnection;
}

requestRouter.post(
  "/request/send/:status/:id",
  userAuth,
  async (req: sendConnectionRequest, res: Response) => {
    try {
      // taking main ingredient
      const fromUserId = req.user?.id;
      const toUserId = req.params.id;
      const status = req.params.status;

      // check status must be present in allowed Status
      const allowedStatus = ["interested", "ignored"];
      if (!status || !allowedStatus.includes(status)) {
        return res.status(400).json({ error: "Invalid or missing status" });
      }

      // check the user is present in db or not
      const user = await User.findById({ toUserId });
      if (!user) {
        return res.status(400).send("user not found!");
      }

      const connectionReq = new UserconnectionModel({
        fromUserId,
        toUserId,
        status
      }
      )

      if( fromUserId === toUserId){
        return res.status(400).send("You cannot send request to yourself")
      }
      
      
      
    } catch (error) {
      res.status(400).send("Error ;" + error);
    }
  }
);
