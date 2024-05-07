
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosIntance from '../Helper';
import { toast } from 'react-toastify';
const STATUS=Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
})
export const blogDataApi=createAsyncThunk("/blogdetails",async(id)=>{
    let response=await axiosIntance.get(`/blogdetails/${id}`)
    return response.data.data

})
export const commentApi=createAsyncThunk("comment/create",async({id,payload})=>{
    let response=await axiosIntance.post(`/blog/${id}/comment/create`,payload)
    return response.data
})
export const commentFetchApi=createAsyncThunk("comment/fetch",async(id)=>{
    let response=await axiosIntance.get(`/comment/${id}`)
    return response.data.post.comment.comments
})
const blogDataSlice=createSlice({
    name:"blogData",
    initialState:{
        bddata:[],
        cdata:[],
        status:STATUS.IDLE
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(blogDataApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(blogDataApi.fulfilled,(state,action)=>{
            state.status=STATUS.IDLE
            state.bddata=action.payload
        })
        .addCase(blogDataApi.rejected,(state)=>{
            state.status=STATUS.ERROR
        })
        .addCase(commentApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(commentApi.fulfilled,(state,{payload})=>{
            state.status=STATUS.IDLE
            toast.success("comment successfully added")

        })
        .addCase(commentApi.rejected,(state)=>{
            state.status=STATUS.ERROR
            toast.error("comment error")
        })
        .addCase(commentFetchApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(commentFetchApi.fulfilled,(state,action)=>{
            state.status=STATUS.IDLE
            state.cdata=action.payload
        })
        .addCase(commentFetchApi.rejected,(state)=>{
            state.status=STATUS.IDLE
        })

    }

})
export default blogDataSlice.reducer