import createsocketConnection from "@/utils/socket";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "@/store/store";
import type { User } from "@/features/user/userSlice";

const Chat = () => {

  const {toUserId} =useParams()
  const user = useSelector((store:RootState)=> store.user) as User | null;
  const firstName = user?.firstName
  const lastName = user?.lastName
  const userId = user?._id

  const [messages,setMessages] = useState<string[]>([])
  const [newMessage,setNewMessage] = useState("")

  function sendMessage (){
    const socket = createsocketConnection();
    if(!newMessage.trim()) return
    
    setMessages([...messages,newMessage])

    socket?.emit("sendMessage",{
      firstName:firstName,
      lastName:lastName,
      userId,
      toUserId,
      text:newMessage
    })
    setNewMessage("")
  }
  
  useEffect(() => {
    if(!userId) return
    const socket = createsocketConnection();

    socket?.emit("joinChat",{
      firstName,
      toUserId,
      userId
    })

    socket?.on("messageRecieved",({firstName,lastName,text})=>{
      console.log(`${firstName} ${lastName} says ${text}`)
      setMessages([...messages,text ])
    } )


    return ()=>{
      socket?.disconnect()
    }
    
  }, [userId,toUserId,firstName]);

  return (
    <div className="flex flex-col h-screen bg-white p-4">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-300 rounded-2xl p-4 shadow">
        <div className="mb-3 text-left">
          <div className="inline-block bg-white text-gray-800 p-2 rounded-2xl max-w-xs">
            {messages}
          </div>
        </div>

        <div className="mb-3 text-right">
          <div className="inline-block bg-blue-500 text-white p-2 rounded-2xl max-w-xs">
            Hi! I need help.
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e)=> setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-300 rounded-2xl focus:outline-none"
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded-2xl shadow">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
