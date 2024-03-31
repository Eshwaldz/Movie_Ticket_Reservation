import { axiosInstance } from ".";

/**
 * ทำการชำระเงิน
 * @param {string} token - โทเค็นของผู้ที่การชำระเงิน
 * @param {number} amount - จำนวนเงินที่ต้องการชำระ
 * @returns {Promise<object>} - ข้อมูลการชำระเงินที่ได้รับจากเซิร์ฟเวอร์
 */
export const MakePayment = async (token, amount) => {
  // ทำการเรียกใช้ API เพื่อทำการชำระเงิน
  try {
    const response = await axiosInstance.post("/api/bookings/make-payment", {
      token,
      amount,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/**
 * จองตั๋วการแสดง
 * @param {object} payload - ข้อมูลเกี่ยวกับการจองตั๋วการแสดง
 * @returns {Promise<object>} - ข้อมูลการจองที่ได้รับจากเซิร์ฟเวอร์
 */
export const BookShowTickets = async (payload) => {
  // ทำการเรียกใช้ API เพื่อทำการจองตั๋วการแสดง
  try {
    const response = await axiosInstance.post(
      "/api/bookings/book-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/**
 * รับข้อมูลการจองของผู้ใช้
 * @returns {Promise<object>} - ข้อมูลการจองทั้งหมดของผู้ใช้
 */
export const GetBookingsOfUser = async () => {
  // ทำการเรียกใช้ API เพื่อรับข้อมูลการจองของผู้ใช้
  try {
    const response = await axiosInstance.get("/api/bookings/get-bookings");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/**
 * MakePayment: ฟังก์ชันนี้ใช้สำหรับการทำการชำระเงิน โดยรับพารามิเตอร์เป็นโทเค็นของผู้ใช้และจำนวนเงินที่ต้องการชำระ 
 * และส่งคืนข้อมูลการชำระเงินที่ได้รับจากเซิร์ฟเวอร์ ซึ่งมีรูปแบบเป็น Promise ที่มีข้อมูลเป็นอ็อบเจกต์
 * 
 * BookShowTickets: ฟังก์ชันนี้ใช้สำหรับการจองตั๋วการแสดง โดยรับพารามิเตอร์เป็นอ็อบเจกต์ที่มีข้อมูลเกี่ยวกับการจองตั๋วการแสดง 
 * เช่น ไอดีของการหนัง ที่นั่ง และอื่น ๆ และส่งคืนข้อมูลการจองที่ได้รับจากเซิร์ฟเวอร์ ในรูปแบบของ Promise ที่มีข้อมูลเป็นอ็อบเจกต์
 * 
 * GetBookingsOfUser: ฟังก์ชันนี้ใช้สำหรับรับข้อมูลการจองทั้งหมดของผู้ใช้ โดยไม่ต้องรับพารามิเตอร์ 
 * และส่งคืนข้อมูลการจองทั้งหมดของผู้ใช้ ในรูปแบบของ Promise ที่มีข้อมูลเป็นอ็อบเจกต์
 * 
 */