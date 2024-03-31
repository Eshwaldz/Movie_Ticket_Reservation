import { axiosInstance } from ".";

/**
 * เพิ่มโรงหนังใหม่
 * @param {object} payload - ข้อมูลเกี่ยวกับโรงหนังที่ต้องการเพิ่ม
 * @returns {Promise<object>} - ข้อมูลการเพิ่มโรงหนังที่ได้รับจากเซิร์ฟเวอร์
 */
export const AddTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * แสดงรายการโรงหนังทั้งหมด
 * @returns {Promise<object>} - ข้อมูลรายการโรงหนังทั้งหมดที่ได้รับจากเซิร์ฟเวอร์
 */
export const GetAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * แสดงรายการโรงหนังที่ตัวเองเป็นเจ้าของเท่านั้น
 * @param {object} payload - ข้อมูลเกี่ยวกับเจ้าของโรงหนัง
 * @returns {Promise<object>} - ข้อมูลรายการโรงหนังที่เป็นเจ้าของที่ได้รับจากเซิร์ฟเวอร์
 */
export const GetAllTheatresByOwner = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-owner",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * อัพเดตข้อมูลโรงหนัง
 * @param {object} payload - ข้อมูลเกี่ยวกับโรงหนังที่ต้องการอัพเดต
 * @returns {Promise<object>} - ข้อมูลการอัพเดตโรงหนังที่ได้รับจากเซิร์ฟเวอร์
 */
export const UpdateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/update-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * ลบโรงหนัง
 * @param {object} payload - ข้อมูลเกี่ยวกับโรงหนังที่ต้องการลบ
 * @returns {Promise<object>} - ข้อมูลการลบโรงหนังที่ได้รับจากเซิร์ฟเวอร์
 */
export const DeleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/delete-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * เพิ่มการแสดงภาพยนต์ใหม่ในโรงหนัง
 * @param {object} payload - ข้อมูลเกี่ยวกับการแสดงภาพยนต์ที่ต้องการเพิ่ม
 * @returns {Promise<object>} - ข้อมูลการเพิ่มการแสดงภาพยนต์ที่ได้รับจากเซิร์ฟเวอร์
 */
export const AddShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * แสดงรายการภาพยนต์ที่มีอยู่ในโรงหนัง
 * @param {object} payload - ข้อมูลเกี่ยวกับโรงหนังที่ต้องการดูรายการภาพยนต์
 * @returns {Promise<object>} - ข้อมูลรายการภาพยนต์ที่มีอยู่ในโรงหนังที่ได้รับจากเซิร์ฟเวอร์
 */
export const GetAllShowsByTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-shows-by-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * ลบการแสดงภาพยนต์ในโรงหนัง
 * @param {object} payload - ข้อมูลเกี่ยวกับการแสดงภาพยนต์ที่ต้องการลบ
 * @returns {Promise<object>} - ข้อมูลการลบการแสดงภาพยนต์ที่ได้รับจากเซิร์ฟเวอร์
 */
export const DeleteShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/delete-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * แสดงรายการโรงหนังที่มีการแสดงภาพยนต์ในเวลานี้
 * @param {object} payload - ข้อมูลเกี่ยวกับภาพยนต์ที่ต้องการดูรายการโรงหนัง
 * @returns {Promise<object>} - ข้อมูลรายการโรงหนังที่มีการแสดงภาพยนต์ในเวลานี้ที่ได้รับจากเซิร์ฟเวอร์
 */
export const GetAllTheatresByMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-movie",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * แสดงข้อมูลการแสดงภาพยนต์ตาม ID
 * @param {object} payload - ข้อมูลเกี่ยวกับการแสดงภาพยนต์ที่ต้องการดู
 * @returns {Promise<object>} - ข้อมูลการแสดงภาพยนต์ที่ได้รับจากเซิร์ฟเวอร์
 */
export const GetShowById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-show-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

/**
 * AddTheatre: ใช้สำหรับเพิ่มข้อมูลของโรงหนังใหม่ลงในระบบ โดยรับอ็อบเจกต์ที่เก็บข้อมูลเกี่ยวกับโรงหนังที่ต้องการเพิ่ม 
 * เช่น ชื่อโรงหนัง ที่อยู่ และข้อมูลที่เกี่ยวข้องเป็นพารามิเตอร์ หลังจากที่เรียกใช้งานฟังก์ชันแล้ว จะส่งคืนข้อมูลที่ได้รับจากเซิร์ฟเวอร์เกี่ยวกับการเพิ่มโรงหนังนั้น
 * 
 * GetAllTheatres: ใช้สำหรับแสดงรายการของโรงหนังทั้งหมดในระบบ โดยไม่ต้องรับพารามิเตอร์ใดๆ 
 * หลังจากที่เรียกใช้งานฟังก์ชันแล้ว จะส่งคืนข้อมูลที่ได้รับจากเซิร์ฟเวอร์เกี่ยวกับรายการโรงหนังทั้งหมด
 * 
 * GetAllTheatresByOwner: ใช้สำหรับแสดงรายการโรงหนังที่เป็นเจ้าของโดยเฉพาะ โดยรับอ็อบเจกต์ที่เก็บข้อมูลเกี่ยวกับเจ้าของโรงหนัง 
 * เช่น ไอดีผู้ใช้หรือข้อมูลอื่น ๆ ที่เกี่ยวข้องเป็นพารามิเตอร์ หลังจากที่เรียกใช้งานฟังก์ชันแล้ว จะส่งคืนข้อมูลที่ได้รับจากเซิร์ฟเวอร์เกี่ยวกับรายการโรงหนังที่เป็นเจ้าของทั้งหมด
 * 
 * UpdateTheatre: ใช้สำหรับอัพเดตข้อมูลของโรงหนัง โดยรับอ็อบเจกต์ที่เก็บข้อมูลเกี่ยวกับโรงหนังที่ต้องการอัพเดต 
 * เช่น ไอดีของโรงหนังและข้อมูลที่ต้องการเปลี่ยนแปลงเป็นพารามิเตอร์ หลังจากที่เรียกใช้งานฟังก์ชันแล้ว จะส่งคืนข้อมูลที่ได้รับจากเซิร์ฟเวอร์เกี่ยวกับการอัพเดตโรงหนังนั้น
 * 
 * DeleteTheatre: ใช้สำหรับลบข้อมูลของโรงหนัง โดยรับอ็อบเจกต์ที่เก็บข้อมูลเกี่ยวกับโรงหนังที่ต้องการลบ เช่น ไอดีของโรงหนังเป็นพารามิเตอร์
 * หลังจากที่เรียกใช้งานฟังก์ชันแล้ว จะส่งคืนข้อมูลที่ได้รับจากเซิร์ฟเวอร์เกี่ยวกับการลบโรงหนังนั้น
 * 
 * AddShow: ใช้สำหรับเพิ่มข้อมูลการแสดงภาพยนต์ใหม่ในโรงหนัง โดยรับอ็อบเจกต์ที่เก็บข้อมูลเกี่ยวกับการแสดงภาพยนต์ที่ต้องการเพิ่ม 
 * เช่น ไอดีของโรงหนังและข้อมูลการแสดงภาพยนต์เป้นพารามิเตอร์ หลังจากที่เรียกใช้งานฟังก์ชันแล้ว จะส่งคืนข้อมูลที่ได้รับจากเซิร์ฟเวอร์เกี่ยวกับการเพิ่มการแสดงภาพยนต์นั้น
 * 
 * GetAllShowsByTheatre: ใช้สำหรับแสดงรายการภาพยนต์ที่มีอยู่ในโรงหนังเฉพาะ โดยรับข้อมูลเกี่ยวกับโรงหนังที่ต้องการดูรายการภาพยนต์เป็นพารามิเตอร์
 * หลังจากที่เรียกใช้งานฟังก์ชันแล้ว จะส่งคืนข้อมูลที่ได้รับจากเซิร์ฟเวอร์เกี่ยวกับรายการภาพยนต์ที่มีอยู่ในโรงหนังนั้น
 * 
 * DeleteShow: ใช้สำหรับลบข้อมูลการแสดงภาพยนต์ในโรงหนัง โดยรับข้อมูลเกี่ยวกับการแสดงภาพยนต์ที่ต้องการลบเป็นพารามิเตอร์
 * หลังจากที่เรียกใช้งานฟังก์ชันแล้ว จะส่งคืนข้อมูลที่ได้รับจากเซิร์ฟเวอร์เกี่ยวกับการลบการแสดงภาพยนต์นั้น
 * 
 * GetAllTheatresByMovie: ใช้สำหรับแสดงรายการโรงหนังที่มีการแสดงภาพยนต์ในเวลานี้ โดยรับข้อมูลเกี่ยวกับภาพยนต์ที่ต้องการดูรายการโรงหนังเป็นพารามิเตอร์
 * หลังจากที่เรียกใช้งานฟังก์ชันแล้ว จะส่งคืนข้อมูลที่ได้รับจากเซิร์ฟเวอร์เกี่ยวกับรายการโรงหนังที่มีการแสดงภาพยนต์ในเวลานี้
 * 
 * GetShowById: ใช้สำหรับแสดงข้อมูลการแสดงภาพยนต์ตาม ID โดยรับข้อมูลเกี่ยวกับการแสดงภาพยนต์ที่ต้องการดูเป็นพารามิเตอร์
 * หลังจากที่เรียกใช้งานฟังก์ชันแล้ว จะส่งคืนข้อมูลที่ได้รับจากเซิร์ฟเวอร์เกี่ยวกับการแสดงภาพยนต์ตาม ID ที่ระบุ
 * 
 */
