import { configureStore } from "@reduxjs/toolkit";
import loadersReducer from "./loadersSlice";
import usersReducer from "./usersSlice";

/**
 * สร้าง store โดยใช้ configureStore จาก Redux Toolkit
 * โดยกำหนด reducers สำหรับ loaders และ users
 */
const store = configureStore({
  reducer: {
    loaders: loadersReducer,
    users: usersReducer,
  },
});

export default store;