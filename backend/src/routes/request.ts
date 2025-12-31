import express from "express";
import userAuth from "../middleware/auth";
const requestRouter = express.Router();
import type { Request, Response } from "express";
import User, { type IUser } from "../models/User";
import UserconnectionModel from "../models/UserConnection";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

requestRouter.post(
  "/request/send/:status/:id",
  userAuth,
  async (req: AuthenticatedRequest, res: Response) => {
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
        return res.status(400).json({ message: "User not found" });
      }

      // user can't send request to himself
      if (fromUserId === toUserId) {
        return res.status(400).send("You cannot send request to yourself");
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
  "/request/review/:status/:connectionId",
  userAuth,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      //take loggedInUser detail
    const loggedInuser = req.user;
    const { status, connectionId } = req.params;

    // console.log("status : ",status)
    // console.log("connectionId : ",connectionId)

    //check status must be valid
    const allowedStatus = ["accepted", "rejected"];
    if (!status || !allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // find connection request
    const connectionRequest = await UserconnectionModel.findOne({
      _id: connectionId,
      toUserId: loggedInuser!._id,
      status: "interested",
    });

    // if connection not found
    if (!connectionRequest) {
      return res.status(400).json({
        message: "Connection request not found",
      });
    }

    // set status to updated status
    connectionRequest.status = status;

    // save the data
    const data = await connectionRequest.save();

    res
      .status(200)
      .json({ message: "Connection request has been processed.", data });
    } catch (error) {
      res.status(400).send("Error : "+ error)
    }
    
  }
);

requestRouter.delete(
  "/request/connection/:userId",
  userAuth,
  async (req: AuthenticatedRequest, res: Response) => {

    try{ 
    const loggedInUserId = req?.user!._id
    const targetUserId = req.params.userId;

      const targetUser = await User.findById(targetUserId);
      if (!targetUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const deletedConnection = await UserconnectionModel.findOneAndDelete({
        $or: [
          { fromUserId: loggedInUserId, toUserId: targetUserId, status: "accepted" },
          { fromUserId: targetUserId, toUserId: loggedInUserId, status: "accepted" },
        ],
      });

      if (!deletedConnection) {
        return res.status(404).json({ 
          message: "No active connection found with this user" 
        });
      }
      
        res.status(200).json({ 
        message: "Connection removed successfully",
      });
  } 
  catch(error){
      res.status(500).json({ error: "Error: " + error });
  }
}
);

export default requestRouter;
