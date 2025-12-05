import io from "socket.io-client"

import { baseUrl } from "./constant"


const createsocketConnection = ()=>{
    if(location.hostname ==="localhost"){
        return io(baseUrl)
    }
}


export default createsocketConnection