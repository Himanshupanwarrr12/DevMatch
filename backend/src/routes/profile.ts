import express from "express";
const profileRouter = express.Router();
import userAuth from "../middleware/auth";
import type { Request, Response } from "express";
import type { User } from "../models/User";
import { validateProfileEditData } from "../utils/validation";

interface profileViewRequest extends Request {
  user?: User;
}

profileRouter.get(
  "/profile/view",
  userAuth,
  async (req: profileViewRequest, res: Response) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (error: unknown) {
      res.status(400).send("Error : " + error);
    }
  }
);

profileRouter.patch(
  "/profile/edit",
  userAuth,
  async (req: profileViewRequest, res: Response) => {
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
    } catch (error) {
      res.status(400).send("Error : " + error);
    }
  }
);

export default profileRouter;
