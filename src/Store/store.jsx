
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import homeSlice from "./homeSlice";
import coursesSlice from "./coursesSlice";
import contactSlice from "./contactSlice";
import blogSlice from "./blogSlice";
import blogDataSlice from "./blogDataSlice";


const store=configureStore({
    reducer:{
        auth:authSlice,
        home:homeSlice,
        course:coursesSlice,
        contact:contactSlice,
        blog:blogSlice,
        blogData:blogDataSlice
    }
})
export default store