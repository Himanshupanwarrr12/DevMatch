import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface feed {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

const initialState = null as feed | null

export const feedSlice = createSlice({
    name:"feed",
    initialState,
    reducers:{
        showFeed : ((state,action: PayloadAction<feed>)=>{
            return action.payload
        }),
        removeUserFromFeed : ((state,action)=>{

        })
    }
})