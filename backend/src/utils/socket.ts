import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import crypto from "crypto"

const intializeSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173" },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, toUserId, userId }) => {
      const roomId: string = [userId, toUserId].sort().join("_");
      console.log(`${firstName} joined on room ${roomId}`);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      ({ firstName, lastName, userId, toUserId, text }) => {
        const rooomId : string = [userId,toUserId].sort().join("_")
        io.to(rooomId).emit("messageRecieved",{firstName,lastName,text})
      }
    );

    socket.on("disconnect", () => {
        console.log("User disconnected")
    });
  });
};

export default intializeSocket;
