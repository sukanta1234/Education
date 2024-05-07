import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIntance from "../Helper";

const STATUS=Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
})
export const bannerDataApi=createAsyncThunk("/baner/data",async()=>{
    let response=await axiosIntance.get("/banner")
    // console.log("banner",response.data.bannerdata);
    return response.data.bannerdata
})

export const serviceApi=createAsyncThunk("/service",async()=>{
    let response=await axiosIntance.get("/service")
    // console.log("banner",response.data.bannerdata);
    return response.data.data
})
export const testimonialApi=createAsyncThunk("/testimonial",async()=>{
    let response=await axiosIntance.get("/testimonial")
    return response.data.testimonials
})
export const teamApi=createAsyncThunk("ouri/team",async()=>{
    let response=await axiosIntance.get("/team")
    return response.data.TeamMember
})
const homeSlice=createSlice({
    name:"banner",
    initialState:{
        bdata:[],
        sdata:[],
        tdata:[],
        team:[],
        status:STATUS.IDLE

    },
    reducers:{

    },
    extraReducers:(builder)=>{
    builder
    .addCase(bannerDataApi.pending,(state)=>{
        state.status=STATUS.LOADING
    })
    .addCase(bannerDataApi.fulfilled,(state,action)=>{
        state.status=STATUS.IDLE;
        state.bdata=action.payload
    })
    .addCase(bannerDataApi.rejected,(state)=>{
        state.status=STATUS.ERROR
    })
    
    .addCase(serviceApi.pending,(state)=>{
        state.status=STATUS.LOADING
    })
    .addCase(serviceApi.fulfilled,(state,action)=>{
        state.status=STATUS.IDLE
        state.sdata=action.payload
    })
    .addCase(serviceApi.rejected,(state)=>{
        state.status=STATUS.ERROR
    })
    .addCase(testimonialApi.pending,(state)=>{
        state.status=STATUS.LOADING
    })
    .addCase(testimonialApi.fulfilled,(state,action)=>{
        state.status=STATUS.IDLE
        state.tdata=action.payload
    })
    .addCase(testimonialApi.rejected,(state)=>{
        state.status=STATUS.ERROR
    })
    .addCase(teamApi.pending,(state)=>{
        state.status=STATUS.LOADING
    })
    .addCase(teamApi.fulfilled,(state,action)=>{
        state.status=STATUS.IDLE
        state.team=action.payload
    })
    .addCase(teamApi.rejected,(state)=>{
        state.status=STATUS.ERROR
    })


    }

})
export default homeSlice.reducer