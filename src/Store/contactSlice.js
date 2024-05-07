
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosIntance from '../Helper';
import { toast } from 'react-toastify';

import axiosIntance from '../Helper';
const STATUS=Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
})
export const contactApi=createAsyncThunk("/contact/create",async(data)=>{
    let response=await axiosIntance.post("/contact/create",data)
    return response.data
})

const contactSlice=createSlice({
    name:"contact",
    initialState:{
        status:STATUS.IDLE

    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(contactApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(contactApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE;
           
                toast.success("Thank you for your response")
                
                
            
        })
        .addCase(contactApi.rejected,(state)=>{
            state.status=STATUS.IDLE
            toast.error("Don't Contact again")
        })

    }
})
export default contactSlice.reducer