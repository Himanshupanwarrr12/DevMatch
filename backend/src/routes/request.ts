import express from "express";
import userAuth from "../middleware/auth";
const requestRouter = express.Router();
import type { Request, Response } from "express";
import User, { type IUser } from "../models/User";
import UserconnectionModel from "../models/UserConnection";


interface sendConnectionRequest extends Request {
  user?: IUser;
}

requestRouter.post(
  "/request/send/:status/:id",
  userAuth,
  async (req: sendConnectionRequest, res: Response) => {
    try {
      // taking main ingredients
      const fromUserId = req.user!.id;
      const toUserId = req.params.id;
      const status = req.params.status;

      // check status must be present in allowed Status
      const allowedStatus = ["interested", "ignored"];
      if (!status || !allowedStatus.includes(status)) {
        return res.status(400).json({ error: "Invalid or missing status" });
      }

      // check the user is present in db or not
      const user = await User.findById(toUserId);
      if (!user) {
        return res.status(400).send("user not found!");
      }

      // check user can't send request to toUser if toUser already sent request to fromUser and can't send connection again
      const checkExistingConnection = await UserconnectionModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (checkExistingConnection) {
        return res
          .status(400)
          .json({ message: "Connection request already exists " });
      }

      // user can't send request to himself
      if (fromUserId === toUserId) {
        return res.status(400).send("You cannot send request to yourself");
      }

      const connectionReq = new UserconnectionModel({
        fromUserId,
        toUserId,
        status,
      });

      //finally saving the data
      const data = await connectionReq.save();

      res.status(200).json({ message: "Request processed sucessfully!", data });
    } catch (error) {
      res.status(400).send("Error ;" + error);
    }
  }
);

requestRouter.post(
  "request/review/:status/:requestId",
  userAuth,
  (req: sendConnectionRequest, res: Response) => {

     //1.take loggedInuser and main ingredeints through url 2.declare allowed status and validate the status 3.
    
  }
);
