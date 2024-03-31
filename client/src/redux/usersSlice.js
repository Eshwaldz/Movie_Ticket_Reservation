import { createSlice } from "@reduxjs/toolkit";

/**
 * สร้าง slice สำหรับการจัดการข้อมูลผู้ใช้
 */
const usersSlice = createSlice({
  name: "users", // ชื่อ slice
  initialState: {
    user: null, // สถานะเริ่มต้น: ไม่มีผู้ใช้
  },
  reducers: {
    /**
     * Reducer สำหรับการกำหนดข้อมูลผู้ใช้
     * @param {Object} state - สถานะปัจจุบันของ slice
     * @param {Object} action - ข้อมูลแอ็กชันที่ถูกเรียกใช้
     */
    SetUser: (state, action) => {
      state.user = action.payload; // กำหนดข้อมูลผู้ใช้จาก payload ที่ส่งมา
    },
  },
});

export const { SetUser } = usersSlice.actions; // สร้าง action creator จาก reducers ที่กำหนด

export default usersSlice.reducer; // ส่งออก reducer ของ slice นี้