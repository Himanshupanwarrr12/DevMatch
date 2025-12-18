import {Server} from "socket.io"
import type { Server as HTTPServer} from "http"


const intializeSocket = (server:HTTPServer) => {
    const io = new Server(server,{
    cors:{origin:"http://localhost:5173"}
})

io.on("connection",(socket)=>{

    socket.on("joinChat",({firstName,toUserId,userId})=>{
        const roomId:string = [userId,toUserId].sort().join("_");
        console.log(`${firstName} joined on room ${roomId}`)
        socket.join(roomId)
    })

    socket.on("sendMessage",()=>{

    })

    socket.on("disconnect",()=>{
        
    })
    
})

}

export default intializeSocket


