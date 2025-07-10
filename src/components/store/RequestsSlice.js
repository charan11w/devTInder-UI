import { createSlice } from "@reduxjs/toolkit";

const RequestsSlice=createSlice({
  name:"requests",
  initialState:null,
  reducers:{
    addRequests(state,action){
      return action.payload
    },
    removeRequest(state,action){
      const newArray=state.filter(user => user._id !== action.payload)
      return newArray
    }
  }
})

export const { addRequests,removeRequest} =RequestsSlice.actions

export default RequestsSlice.reducer;