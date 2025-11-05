import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../user/userSlice";

const initialState:  User[] = []

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action: PayloadAction<string>) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { setFeed,removeUserFromFeed }  = feedSlice.actions
export default feedSlice.reducer