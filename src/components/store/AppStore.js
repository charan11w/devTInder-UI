import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import FeedSlice from "./FeedSlice";
import ConnectionSlice from "./ConnectionSlice"
import RequestsSlice from "./RequestsSlice"

export const store = configureStore({
  reducer: {
    user: AuthSlice,
    feed: FeedSlice,
    connections:ConnectionSlice,
    requests:RequestsSlice
  },
});
