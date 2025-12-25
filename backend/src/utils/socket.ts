import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import crypto from "crypto"

const secretRoomId = (userId:string,toUserId:string)=>{
  return crypto
   .createHash("sha256")
    .update([userId, toUserId].sort().join("$"))
    .digest("hex");
}

const intializeSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173" },
  });

  io.on("connection", (socket) => {

    socket.on("joinChat", ({ firstName, toUserId, userId }) => {
      const roomId: string = secretRoomId(userId,toUserId)
      console.log(`${firstName} joined on room ${roomId}`);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      ({ firstName, lastName, userId, toUserId, text }) => {
        const rooomId : string = [userId,toUserId].sort().join("_")

        // saving message to db
        
        io.to(rooomId).emit("messageRecieved",{firstName,lastName,text})
      }
    );

    socket.on("disconnect", () => {
        console.log("User disconnected")
    });
  });
};

export default intializeSocket;
