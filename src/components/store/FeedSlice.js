import { createSlice } from "@reduxjs/toolkit";

const FeedSlice=createSlice({
  name:"feed",
  initialState:null,
  reducers:{
    addToFeed(state,action){
      return action.payload;
    },
    removeFeed(state){
      return null
    }
  }
})

export const {addToFeed}=FeedSlice.actions;
export default FeedSlice.reducer;