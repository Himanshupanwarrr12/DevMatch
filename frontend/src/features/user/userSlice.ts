import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
}

export interface userState {
  user: User | null;
}

const initialState: userState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
