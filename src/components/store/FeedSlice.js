import { createSlice } from "@reduxjs/toolkit";

const FeedSlice=createSlice({
  name:"feed",
  initialState:null,
  reducers:{
    addToFeed(state,action){
      return action.payload;
    },
    removeFromFeed(state,action){
      const newArray=state.filter((user) =>  user._id !== action.payload)
      return newArray;
    },
    removeFeed(state){
      return null;
    }
  }
})

export const {addToFeed, removeFromFeed,removeFeed}=FeedSlice.actions;
export default FeedSlice.reducer;