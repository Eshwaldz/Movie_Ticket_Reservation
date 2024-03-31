import { createSlice } from "@reduxjs/toolkit";

const loadersSlice = createSlice({
  name: "loaders",
  initialState: {
    loading: false,
  },
  reducers: {
    /**
     * การกระทำเพื่อตั้งค่าการโหลดเป็นจริง
     * @function ShowLoading
     * @memberof module:loadersSlice
     * @param {LoadersState} state - อ็อบเจกต์สถานะปัจจุบัน
     * @return {void}
     */
    ShowLoading: (state) => {
      state.loading = true;
    },
    /**
     * การกระทำเพื่อตั้งค่าการโหลดเป็นเท็จ
     * @function HideLoading
     * @memberof module:loadersSlice
     * @param {LoadersState} state - อ็อบเจกต์สถานะปัจจุบัน
     * @return {void}
     */
    HideLoading: (state) => {
      state.loading = false;
    }
  }
});

export const { ShowLoading, HideLoading } = loadersSlice.actions;

/**
 * ฟังก์ชันเรดิวเซอร์สำหรับ loadersSlice
 * @function loadersReducer
 * @memberof module:loadersSlice
 * @param {LoadersState} state - อ็อบเจกต์สถานะปัจจุบัน
 * @param {Object} action - แอ็กชัน Redux
 * @return {LoadersState} อ็อบเจกต์สถานะใหม่
 */
export default loadersSlice.reducer;
