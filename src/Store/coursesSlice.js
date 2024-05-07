import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIntance from "../Helper";
import { toast } from "react-toastify";
const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
export const courseApi = createAsyncThunk("our/course", async () => {
  let response = await axiosIntance.get("/course");
  return response.data.Courses;
});
// export const purchesApi=createAsyncThunk("/course/apply/",async({formData,id})=>{
//     let response=await axiosIntance.post(`/course/apply/${id}`,formData)
//     return response.data
// })
export const purchesApi = createAsyncThunk(
  "yourSlice/courseApply",
  async ({ id ,payload} , thunkAPI) => {
    try {
      const response = await axiosIntance.post(`/course/apply/${id}`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const coursesSlice = createSlice({
  name: "couses",
  initialState: {
    data: [],
    status: STATUS.IDLE,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(courseApi.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(courseApi.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.data = action.payload;
      })
      .addCase(courseApi.rejected, (state) => {
        state.status = STATUS.ERROR;
      })
      .addCase(purchesApi.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(purchesApi.fulfilled, (state, { payload }) => {
        state.status = STATUS.IDLE;
        if (payload?.status === 200) {
          toast(payload?.message);
        }
      })
      .addCase(purchesApi.rejected, (state) => {
        state.status = STATUS.ERROR;
        toast.error("Error in Purches");
      });
  },
});

export default coursesSlice.reducer;
