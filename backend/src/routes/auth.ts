import express from "express";
const authRouter = express.Router();
import validateSignUpData from "../utils/validation";
import bcrypt from "bcrypt";
import User from "../models/User";

//signUp api
authRouter.post("/signUp", async (req, res) => {
  try {
    // 1.validating signup data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password, gender } = req.body;
    //2.checking if user already exist
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res
        .status(400)
        .json({ eror: "User already exists with this email Id" });
    }

    //3.Encrypting the password(because we can't save the naked password)
    const hashedPass = await bcrypt.hash(password, 10);

    // 4.creating a new user
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: hashedPass,
      gender: gender,
    });

    // 5.saving the user and generating token
    const savedUser = await user.save();
    const token = savedUser.getJWT();

    //6. setting cookie and respond
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User Added successfully!", data: savedUser });
    1;
  } catch (error: unknown) {
    res.status(400).send("Error : " + error);
  }
});

// login api
authRouter.post("/login", async (req, res) => {
  try {
    //1.I will take id & pass
    const { emailId, password } = req.body;

    // 2.I will took out the user with this email
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.status(401).json({ message: "Invalid Credentials!!" });
    }
    
    //3. I will validate the password
    const passCheck = await user?.isValidPassword(password);
    if (!passCheck) {
      res.status(401).json({ message: "Invalid Credentials!!" });
    }

    //4. now will make token and send to the user also send user as response
    const token = await user?.getJWT();
    res.cookie("token", token);
    res.send(user);
  } catch (error: unknown) {
    res.status(400).send("Error : " + error);
  }
});

// logout api
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    path: "/",
  });
  res.send("loged out successfully");
});

export default authRouter;
