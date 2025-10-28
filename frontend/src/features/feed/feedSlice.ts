import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Feed {
  _id : string;
  firstName: string;
  gender: string;
  about:string;
  sklls:string[]
  photoUrl:string;
}

const initialState:  Feed[] = []

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<Feed[]>) => {
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