const { axiosInstance } = require(".");

/**
 * เพิ่มหนังใหม่
 * @param {object} payload - ข้อมูลเกี่ยวกับหนังที่ต้องการเพิ่ม
 * @returns {Promise<object>} - ข้อมูลการเพิ่มหนังที่ได้รับจากเซิร์ฟเวอร์
 */
export const AddMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * แสดงรายการหนังทั้งหมด
 * @returns {Promise<object>} - ข้อมูลรายการหนังทั้งหมดที่ได้รับจากเซิร์ฟเวอร์
 */
export const GetAllMovies = async () => {
  try {
      const response = await axiosInstance.get("/api/movies/get-all-movies");
      return response.data;
  } catch (error) {
      return error.response;
  }
}

/**
 * อัพเดตรายละเอียดหนัง
 * @param {object} payload - ข้อมูลเกี่ยวกับหนังที่ต้องการอัพเดต
 * @returns {Promise<object>} - ข้อมูลการอัพเดตหนังที่ได้รับจากเซิร์ฟเวอร์
 */
export const UpdateMovie = async (payload) => {
  try {
      const response = await axiosInstance.post("/api/movies/update-movie", payload);
      return response.data;
  } catch (error) {
      return error.response;
  }
}

/**
 * ลบรายการหนัง
 * @param {object} payload - ข้อมูลเกี่ยวกับหนังที่ต้องการลบ
 * @returns {Promise<object>} - ข้อมูลการลบหนังที่ได้รับจากเซิร์ฟเวอร์
 */
export const DeleteMovie = async (payload) => {
  try {
      const response = await axiosInstance.post("/api/movies/delete-movie", payload);
      return response.data;
  } catch (error) {
      return error.response;
  }
}

/**
 * รับข้อมูลหนังตามเลข ID
 * @param {string} id - รหัส ID ของหนังที่ต้องการรับข้อมูล
 * @returns {Promise<object>} - ข้อมูลหนังที่ได้รับจากเซิร์ฟเวอร์
 */
export const GetMovieById = async (id) => {
  try {
      const response = await axiosInstance.get(`/api/movies/get-movie-by-id/${id}`);
      return response.data;
  } catch (error) {
      return error.response;
  }
}

/**
 * AddMovie: ฟังก์ชันนี้ใช้สำหรับเพิ่มหนังใหม่ โดยรับข้อมูลเกี่ยวกับหนังที่ต้องการเพิ่มเป็นพารามิเตอร์ 
 * และส่งคำขอ POST ไปยังเซิร์ฟเวอร์ และคืนข้อมูลการเพิ่มหนังที่ได้รับจากเซิร์ฟเวอร์ ในรูปแบบของ Promise ที่มีข้อมูลเป็นอ็อบเจกต์
 * 
 * GetAllMovies: ฟังก์ชันนี้ใช้สำหรับแสดงรายการหนังทั้งหมด โดยส่งคำขอ GET ไปยังเซิร์ฟเวอร์ 
 * และคืนข้อมูลรายการหนังทั้งหมดที่ได้รับจากเซิร์ฟเวอร์ ในรูปแบบของ Promise ที่มีข้อมูลเป็นอ็อบเจกต์
 * 
 * UpdateMovie: ฟังก์ชันนี้ใช้สำหรับอัพเดตรายละเอียดหนัง โดยรับข้อมูลเกี่ยวกับหนังที่ต้องการอัพเดตเป็นพารามิเตอร์ 
 * และส่งคำขอ POST ไปยังเซิร์ฟเวอร์ และคืนข้อมูลการอัพเดตหนังที่ได้รับจากเซิร์ฟเวอร์ ในรูปแบบของ Promise ที่มีข้อมูลเป็นอ็อบเจกต์
 * 
 * DeleteMovie: ฟังก์ชันนี้ใช้สำหรับลบรายการหนัง โดยรับข้อมูลเกี่ยวกับหนังที่ต้องการลบเป็นพารามิเตอร์ และส่งคำขอ POST ไปยังเซิร์ฟเวอร์ 
 * และคืนข้อมูลการลบหนังที่ได้รับจากเซิร์ฟเวอร์ ในรูปแบบของ Promise ที่มีข้อมูลเป็นอ็อบเจกต์
 * 
 * GetMovieById: ฟังก์ชันนี้ใช้สำหรับรับข้อมูลหนังตามเลข ID โดยรับเลข ID เป็นพารามิเตอร์ และส่งคำขอ GET ไปยังเซิร์ฟเวอร์ 
 * และคืนข้อมูลหนังที่ได้รับจากเซิร์ฟเวอร์ ในรูปแบบของ Promise ที่มีข้อมูลเป็นอ็อบเจกต์
 * 
 */