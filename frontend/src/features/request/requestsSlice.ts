import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../user/userSlice";

const initialState : User[] = []

const requestsSlice = createSlice({
    name:"requests",
    initialState,
    reducers:{
        showRequests:(state,action) => {
            return action.payload
        },
        removeRequests: ()=> null
    }
})

export const {showRequests,removeRequests} = requestsSlice.actions
export default  requestsSlice.reducer