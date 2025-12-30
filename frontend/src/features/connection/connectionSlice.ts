import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../user/userSlice";

const initialState: User[] = [];

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    setConnections: (_, action: PayloadAction<User[]>) => action.payload,
  },
});

export const { setConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
