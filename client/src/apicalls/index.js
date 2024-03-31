import axios from "axios";

/**
 * Axios instance ที่ใช้สำหรับการส่งคำขอ HTTP ไปยังเซิร์ฟเวอร์
 * โดยมีการเซ็ต header ให้กับทุกคำขอโดยอัตโนมัติ
 * โดยใช้โทเค็นที่เก็บใน localStorage เพื่อทำการยืนยันตัวตน
 */
export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/**
 * axiosInstance: เป็นตัวแปรที่ใช้สำหรับเก็บ Instance ของ Axios ที่ถูกกำหนดค่าเพื่อส่งคำขอ HTTP ไปยังเซิร์ฟเวอร์ 
 * โดยมีการกำหนด header เริ่มต้นให้กับทุกคำขอ ซึ่งมี header "Content-Type" เป็น "application/json" 
 * และ header "authorization" ที่มีค่าเป็น Bearer token ที่เก็บไว้ใน localStorage ซึ่งใช้ในการยืนยันตัวตนของผู้ใช้.
 * 
 * Bearer token: เป็นวิธีการส่ง token ที่ใช้ในการยืนยันตัวตนผู้ใช้งานผ่าน header "authorization" 
 * ในคำขอ HTTP โดยมีรูปแบบการส่งเป็น "Bearer {token}" โดยที่ {token} คือค่า token 
 * ที่ถูกเก็บไว้ใน localStorage หรือสถานที่ที่เหมาะสมในแต่ละกรณีการใช้งาน.
 * 
 */