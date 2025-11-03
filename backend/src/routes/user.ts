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

const USER_SAFE_DATA = "firstName lastName photoUrl about gender skills ";

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
      const loggedInUser = req.user as IUser;

      const connectionRequests = await UserConnection.find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

      const connections = connectionRequests.map((connectionRequest) => {
        const fromUserId = connectionRequest.fromUserId as unknown as IUser;
        const toUserId = connectionRequest.toUserId as unknown as IUser;

        if (fromUserId._id.toString() === loggedInUser._id.toString()) {
          return toUserId;
        }
        return fromUserId;
      });
      res.json({ success: true, connections, count: connections.length });
    } catch (error) {
      res.status(400).json({
        message: "Error fetching connections",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

userRouter.get(
  "/user/feed",
  userAuth,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const loggedInUser = req.user;
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 10;
      const skip = (page - 1) * limit;

      //fetch all connections (intersted,rejected,accepted)
      const allConnections = await UserConnection.find({
        $or: [
          { fromUserId: loggedInUser!._id },
          { toUserId: loggedInUser!._id },
        ],
      }).select("fromUserId  toUserId");

      // stored all that ids that will hide
      const hideUserIds = new Set();
      allConnections.forEach((connection) => {
        hideUserIds.add(connection.fromUserId.toString()),
          hideUserIds.add(connection.toUserId.toString());
      });
      // console.log("hideUserIds : ", hideUserIds);

      // fetch the feed except the pended ones
      const users = await User.find({
        $and: [
          { _id: { $nin: Array.from(hideUserIds) } },
          { _id: { $ne: loggedInUser!._id } },
        ],
      }).select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        // console.log("Users : ", users)
      res.status(200).json({
        success:true,
        users,
        totalUsers: users.length,
        page
      })
    } catch (error: unknown) {
     console.error("Feed fetch error:", error);
      res.status(400).json({ 
        success: false,
        message: "Error fetching feed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
);

export default userRouter;
