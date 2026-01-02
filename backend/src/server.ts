import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "./config/database";
import dotenv from "dotenv";
import http from "http"

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://devmatch-six.vercel.app",
    credentials: true,
  })
);

// api routes
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import profileRouter from "./routes/profile";
import requestRouter from "./routes/request";
import intializeSocket from "./utils/socket";
import chatRouter from "./routes/chat";

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",chatRouter);

const httpServer = http.createServer(app)

intializeSocket(httpServer)

const port = process.env.PORT

dbConnection()
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`server is running at ${port}`);
    });
  })
  .catch((err: string) => {
    console.error("Database connection failed:", err);
  });
