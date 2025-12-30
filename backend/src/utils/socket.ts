import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import crypto from "crypto";
import chat from "../models/chat";
import { Types } from "mongoose";

const secretRoomId = (userId: string, toUserId: string) => {
  return crypto
    .createHash("sha256")
    .update([userId, toUserId].sort().join("$"))
    .digest("hex");
};

const intializeSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173" },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, toUserId, userId }) => {
      const roomId: string = secretRoomId(userId, toUserId);
      console.log(`${firstName} joined on room ${roomId}`);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",

      async ({ firstName, lastName, userId, toUserId, text }) => {
        try {
          const rooomId: string = [userId, toUserId].sort().join("_");

          io.to(rooomId).emit("messageRecieved", { firstName, lastName, text,senderId:userId});

          let existingChat = await chat.findOne({
            participants: { $all: [userId, toUserId] },
          });

          if (!existingChat) {
            existingChat = new chat({
              participants: [userId, toUserId],
              messages: [],
            });
          }

          existingChat.messages.push({
            senderId: toUserId,
            text: text,
            timeStamps: new Date(),
          });

          await existingChat.save();
        } catch (error) {
          console.error("Error sending message:", error);
          socket.emit("messageError", { error: "Failed to send message" });
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default intializeSocket;
