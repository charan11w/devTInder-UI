import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import FeedSlice from "./FeedSlice";
import ConnectionSlice from "./ConnectionSlice"

export const store = configureStore({
  reducer: {
    user: AuthSlice,
    feed: FeedSlice,
    connections:ConnectionSlice
  },
});
