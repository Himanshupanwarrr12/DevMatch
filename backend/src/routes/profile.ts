import express from "express";
const profileRouter = express.Router();
import userAuth from "../middleware/auth";
import type { Request, Response } from "express";
import type { IUser } from "../models/User";
import { validateProfileEditData } from "../utils/validation";

interface ProfileViewRequest extends Request {
  user?: IUser;
}

profileRouter.get(
  "/profile/view",
  userAuth,
  async (req: ProfileViewRequest, res: Response) => {
    try {
      const user = req.user;
      // console.log(user)

      const safeUser = {
        _id:user?._id,
        firstName:user?.firstName,
        lastName:user?.lastName,
        gender:user?.gender,
        skills:user?.skills,
        about:user?.about,
        photoUrl:user?.photoUrl,
        createdAt:user?.createdAt,
        updatedAt:user?.updatedAt
      }
      
      res.status(200).json({
        success:true,
        safeUser
      })
    } catch (error: unknown) {
      res.status(400).json({
        success:false,
        message: " Error fetching profile",
        error: error instanceof Error ? error.message : "Unknown error"
      })
    }
  }
);

profileRouter.patch(
  "/profile/edit",
  userAuth,
  async (req: ProfileViewRequest, res: Response) => {
    try {
      
      //first i will validate the req
      if (!validateProfileEditData(req)) {
        throw new Error("Invalid edit request!!");
      }
      // second i will get the loggedInUser
      const loggedInUser = req.user;
      if (!loggedInUser) {
        return res.status(400).send("User not authenticated");
      }

      //now i will set the req edit fields in loggedInuser
      Object.keys(req.body).forEach((key: string) => {
        if (key in loggedInUser) {
          (loggedInUser as any)[key] = req.body[key];
        }
      });
      await loggedInUser.save();
      res.status(200).send("Edited sucessfully");
    } catch (error) {
      res.status(400).json({
        success:false,
        message:"Error during  profile edit",
        error: error instanceof Error ? error.message : "unknown error"
      })
    }
  }
);

export default profileRouter;
