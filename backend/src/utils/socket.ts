import {Server} from "socket.io"
import type { Server as HTTPServer} from "http"


const intializeSocket = (server:HTTPServer) => {
    const io = new Server(server,{
    cors:{origin:"http://localhost:5173"}
})

io.on("connections",(socket)=>{

    socket.on("joinChat",()=>{

    })

    socket.on("sendMessage",()=>{

    })

    socket.on("disconnect",()=>{
        
    })
    
})

}

export default intializeSocket


