const { axiosInstance } = require(".");

/**
 * ลงทะเบียนผู้ใช้ใหม่
 * @param {object} payload - ข้อมูลเกี่ยวกับผู้ใช้ที่ต้องการลงทะเบียน
 * @returns {Promise<object>} - ข้อมูลการลงทะเบียนผู้ใช้ที่ได้รับจากเซิร์ฟเวอร์
 */
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    // หากมีข้อผิดพลาดในการลงทะเบียน ส่งคืนข้อมูลผิดพลาดจากเซิร์ฟเวอร์
    return error.response;
  }
};

/**
 * เข้าสู่ระบบ
 * @param {object} payload - ข้อมูลเข้าสู่ระบบของผู้ใช้
 * @returns {Promise<object>} - ข้อมูลการเข้าสู่ระบบที่ได้รับจากเซิร์ฟเวอร์
 */
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    // หากมีข้อผิดพลาดในการเข้าสู่ระบบ ส่งคืนข้อมูลผิดพลาดจากเซิร์ฟเวอร์
    return error.response;
  }
};

/**
 * รับข้อมูลผู้ใช้ปัจจุบัน
 * @returns {Promise<object>} - ข้อมูลผู้ใช้ปัจจุบันที่ได้รับจากเซิร์ฟเวอร์
 */
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");
    return response.data;
  } catch (error) {
    // หากมีข้อผิดพลาดในการรับข้อมูลผู้ใช้ปัจจุบัน ส่งคืนข้อมูลผิดพลาด
    return error;
  }
};

/**
 * RegisterUser: ใช้สำหรับลงทะเบียนผู้ใช้ใหม่ในระบบโดยส่งข้อมูลของผู้ใช้ไปยังเซิร์ฟเวอร์ โดยรับข้อมูลของผู้ใช้ที่ต้องการลงทะเบียนเป็นพารามิเตอร์
 * และส่งคืนข้อมูลผลลัพธ์จากการลงทะเบียนผู้ใช้ ซึ่งอาจเป็นข้อมูลผู้ใช้ที่ลงทะเบียนสำเร็จหรือข้อผิดพลาดที่เกิดขึ้น.
 * 
 * LoginUser: ใช้สำหรับเข้าสู่ระบบโดยส่งข้อมูลเข้าสู่ระบบของผู้ใช้ไปยังเซิร์ฟเวอร์ โดยรับข้อมูลของผู้ใช้ที่ต้องการลงทะเบียนเป็นพารามิเตอร์
 * และส่งคืนข้อมูลผลลัพธ์จากการเข้าสู่ระบบ ซึ่งอาจเป็นข้อมูลผู้ใช้ที่เข้าสู่ระบบสำเร็จหรือข้อผิดพลาดที่เกิดขึ้น
 * 
 * GetCurrentUser: ใช้สำหรับรับข้อมูลผู้ใช้ปัจจุบันจากเซิร์ฟเวอร์ โดยไม่ต้องรับพารามิเตอร์ใดๆ และัส่งคืนข้อมูลผู้ใช้ปัจจุบันที่เข้าสู่ระบบอยู่ หรือส่งข้อผิดพลาดที่เกิดขึ้น
 * 
 */