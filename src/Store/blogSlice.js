
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosIntance from '../Helper';

const STATUS=Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
})
export const blogApi=createAsyncThunk("/allBlog",async()=>{
    let response=await axiosIntance.get("/allBlog");
    return response.data.data
})
export const categoryApi=createAsyncThunk("/showallcategory",async()=>{
    let response=await axiosIntance.get("/showallcategory");
    return response.data.data
})
export const categoryWiseApi=createAsyncThunk("/category/post/",async(id)=>{
    let response=await axiosIntance.get(`/category/post/${id}`)
    return response.data.data
})
export const searchApi=createAsyncThunk("/search",async(name)=>{
    let response=await axiosIntance.get(`/search/${name}`);
    return response.data
})
export const recentPostApi=createAsyncThunk("/api/letest-post",async()=>{
    let response=await axiosIntance.get("/letest-post")
    return response.data.data
})
const blogSlice=createSlice({
    name:"blog",
    initialState:{
        bdata:[],
        cdata:[],
        pdata:[],
        status:STATUS.IDLE

    },
    reducers: {
        add: (state, action) => {
         
            return {
                ...state,
                bdata: [action.payload]
            };
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(blogApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(blogApi.fulfilled,(state,action)=>{
            state.status=STATUS.IDLE
            state.bdata=action.payload
        })
        .addCase(blogApi.rejected,(state)=>{
            state.status=STATUS.ERROR
        })
        .addCase(categoryApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(categoryApi.fulfilled,(state,action)=>{
            state.status=STATUS.IDLE
            state.cdata=action.payload
        })
        .addCase(categoryApi.rejected,(state)=>{
            state.status=STATUS.ERROR
        })
        .addCase(categoryWiseApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(categoryWiseApi.fulfilled,(state,action)=>{
            state.status=STATUS.IDLE
            state.bdata=action.payload
        })
        .addCase(categoryWiseApi.rejected,(state)=>{
            state.status=STATUS.ERROR
        })
        .addCase(searchApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(searchApi.fulfilled,(state,action)=>{
            state.status=STATUS.IDLE
            state.bdata=action.payload
        })
        .addCase(searchApi.rejected,(state)=>{
            state.status=STATUS.ERROR
        })
        .addCase(recentPostApi.pending,(state)=>{
            state.status=STATUS.LOADING
        })
        .addCase(recentPostApi.fulfilled,(state,action)=>{
            state.status=STATUS.IDLE
            state.pdata=action.payload
        })
        .addCase(recentPostApi.rejected,(state)=>{
            state.status=STATUS.ERROR
        })
    
    }
})
export const {add}=blogSlice.actions
export default blogSlice.reducer