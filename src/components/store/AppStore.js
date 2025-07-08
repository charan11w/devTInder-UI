import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import FeedSlice from "./FeedSlice";

export const store = configureStore({
  reducer: {
    user: AuthSlice,
    feed: FeedSlice,
  },
});
