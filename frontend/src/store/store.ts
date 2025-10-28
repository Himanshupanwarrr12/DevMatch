import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import feedReducer from "../features/feed/feedSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
