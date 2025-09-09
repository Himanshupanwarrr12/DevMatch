import express from "express";
import userAuth from "../middleware/auth";
const userRouter = express.Router();
import type { Request, Response } from "express";
import type { IUser } from "../models/User";
import UserConnection from "../models/UserConnection";
import User from "../models/User";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const USER_SAFE_DATA = "firstName lastName age about  gender skills ";

userRouter.get(
  "/user/requests/recieved",
  userAuth,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const loggedInUser = req.user;

      const connectionReqs = await UserConnection.find({
        toUserId: loggedInUser?._id,
        status: "interested",
      }).populate("fromUserId", USER_SAFE_DATA);

      res.json({
        message: "Data fetched sucessfully",
        data: connectionReqs,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error fetching connection requests",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

userRouter.get(
  "/user/connections",
  userAuth,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const loggedInUser = req.user;
      console.log("LoggedInUser : ", loggedInUser);

      const connectionRequests = await UserConnection.find({
        $or: [
          { fromUserId: loggedInUser?._id, status: "accepted" },
          { toUserId: loggedInUser?._id, status: "accepted" },
        ],
      })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

      const connections = connectionRequests.map((connectionRequest) => {
        const fromUserId = connectionRequest.fromUserId;
        const toUserId = connectionRequest.toUserId;
        if (fromUserId.toString() === loggedInUser!._id.toString()) {
          return toUserId;
        }
        return fromUserId;
      });
      res.json({ connections });
    } catch (error) {
      res.status(400).json({
        message: "Error fetching connections",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

userRouter.get(
  "user/feed",
  userAuth,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const loggedInUser = req.user;
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 10;
      const skip = (page - 1) * limit;

      // fetch the connections that I don't want in user feed
      const pendingConnectionsReq = await UserConnection.find({
        $or: [
          { fromUserId: loggedInUser!._id },
          { toUserId: loggedInUser!._id },
        ],
      }).populate("fromUserId  toUserId");

      // stored all that pending users in a variable
      const hideUserFromFeed = new Set();
      pendingConnectionsReq.forEach((user) => {
        hideUserFromFeed.add(user.fromUserId.toString()),
          hideUserFromFeed.add(user.toUserId.toString());
      });

      // fetch the feed except the pended ones
      const users = await User.find({
        $and: [
          {
            _id: { $nin: Array.from(hideUserFromFeed) },
          },
          {
            _id: { $ne: loggedInUser!._id },
          },
        ],
      }).skip(skip).limit(limit);

      res.status(200).send(users)
      
    } catch (error: unknown) {
      res.status(400).send("Error : " + error);
    }
  }
);

export default userRouter;
