import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIntance from "../Helper";
import { toast } from "react-toastify";

export const STATUS = Object.freeze({
  IDLE: "idle",

  LOADING: "loading",
});
const initialState = {
  status: STATUS.IDLE,
  isloggedIn: false,
};
export const login = createAsyncThunk("/user/login", async (formData) => {
  let response = await axiosIntance.post("/login", formData);
  return response.data
});
export const registration = createAsyncThunk("/user/register", async (data) => {
  let response = await axiosIntance.post("/register", data);
  return response.data;
});

const authSlice = createSlice({
  name: "user",

  initialState: {
    status:STATUS.IDLE,
    redirect: null,
  },

  reducers: {
    handleLogout: (state, action) => {
      localStorage.removeItem("token");
      state.isloggedIn = false;
    },
    check_token: (state, action) => {
      let token = localStorage.getItem("token");
      if (token != null && token != undefined) {
        state.isloggedIn = true;
      }
    },
    resetReirect: (state, { payload }) => {
      state.redirect = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = STATUS.IDLE;
        if (payload?.status === 200) {
          toast(payload?.message);
          state.isloggedIn = true;
          localStorage.setItem("token", payload?.token);
          state.redirect = "/";
        }
      })
      .addCase(login.rejected, (state) => {
        state.status = STATUS.IDLE;

        toast.error("Error in login");
      })
      .addCase(registration.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.status = STATUS.IDLE;

        if (payload?.status === 200) {
          toast(payload?.message);
        }
        // else{
        //   if (payload?.status==201) {
        //     toast(payload?.message)

        //   }
        // }
      })
      .addCase(registration.rejected, (state) => {
        state.status = STATUS.IDLE;
        toast.error("error");
      });
  },
});
export const { handleLogout, check_token, resetReirect } = authSlice.actions;
export default authSlice.reducer;
