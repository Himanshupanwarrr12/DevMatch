import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../user/userSlice";

const initialState: User[] = [];

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    setConnections: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    removeConnections: () => null,
  },
});

export const { setConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
