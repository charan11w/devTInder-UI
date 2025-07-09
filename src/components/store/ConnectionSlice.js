import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice=createSlice({
  name:"connections",
  initialState:null,
  reducers:{
    addConnections(state,action){
      console.log(action.payload)
      return action.payload
    },
    removeConnections(state){
      return null;
    }
  }
})

export const { addConnections,removeConnections}=ConnectionSlice.actions

export default ConnectionSlice.reducer;