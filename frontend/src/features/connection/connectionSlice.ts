import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../user/userSlice";

const initialState : User[] = []


 const connectionSlice = createSlice({
    name:"connections",
    initialState,
    reducers:{
        showConnections : (state,action: PayloadAction<User[]>) =>{
            return action.payload
        },
        removeConnections:() => null,
    },
    
 })

 export const {showConnections,removeConnections} = connectionSlice.actions

 export default connectionSlice.reducer;