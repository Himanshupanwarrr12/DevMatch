import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../user/userSlice";

const initialState : User[] = []

const requestsSlice = createSlice({
    name:"requests",
    initialState,
    reducers:{
        setRequests:(state,action) => {
            return action.payload
        },
        removeRequests: ()=> null
    }
})

export const {setRequests,removeRequests} = requestsSlice.actions
export default  requestsSlice.reducer