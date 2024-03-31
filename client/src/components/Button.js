import React from "react";

/**
 * คอมโพเนนต์ Button สำหรับการสร้างปุ่มในแอปพลิเคชัน React
 * @param {object} props - คุณสมบัติของคอมโพเนนต์ Button
 * @param {string} props.title - ข้อความที่จะแสดงบนปุ่ม
 * @param {function} props.onClick - ฟังก์ชันที่จะเรียกเมื่อปุ่มถูกคลิก
 * @param {string} [props.variant] - รูปแบบการแสดงของปุ่ม (ค่าเริ่มต้นคือ "solid", สามารถเปลี่ยนเป็น "outlined" ได้)
 * @param {boolean} [props.disabled] - สถานะการใช้งานปุ่ม (true หรือ false)
 * @param {boolean} [props.fullWidth] - การกำหนดให้ปุ่มขยายตามความกว้างของพื้นที่ที่ใส่
 * @param {string} [props.type] - ประเภทของปุ่ม (button, submit, หรือ reset)
 * @returns {JSX.Element} - ปุ่มที่สร้างขึ้น
 */
function Button({ title, onClick, variant, disabled, fullWidth, type }) {
  let className = "bg-primary p-1 text-white";

  if (fullWidth) {
    className += " w-full";
  }
  if (variant === "outlined") {
    className = className.replace(
      "bg-primary",
      "border border-primary text-primary bg-white"
    );
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default Button;

/**
 * Button Component:
 * 
 * หน้าที่: สร้างปุ่มในแอปพลิเคชัน React ซึ่งสามารถกำหนดคุณสมบัติต่างๆ เช่น ข้อความบนปุ่ม, 
 * ฟังก์ชันที่จะเรียกเมื่อปุ่มถูกคลิก, รูปแบบการแสดงของปุ่ม, สถานะการใช้งาน, การขยายตามความกว้าง, และประเภทของปุ่ม.
 * 
 * พารามิเตอร์:
 * title: ข้อความที่จะแสดงบนปุ่ม.
 * onClick: ฟังก์ชันที่จะเรียกเมื่อปุ่มถูกคลิก.
 * variant (optional): รูปแบบการแสดงของปุ่ม (ค่าเริ่มต้นคือ "solid" และสามารถเปลี่ยนเป็น "outlined" ได้).
 * disabled (optional): สถานะการใช้งานปุ่ม (true หรือ false).
 * fullWidth (optional): การกำหนดให้ปุ่มขยายตามความกว้างของพื้นที่ที่ใส่.
 * type (optional): ประเภทของปุ่ม (button, submit, หรือ reset).
 * 
 * การส่งคืนข้อมูล: ปุ่มที่สร้างขึ้นเป็น JSX.Element ซึ่งเป็นส่วนของอินเทอร์เฟซผู้ใช้งาน และจะถูกแสดงบนหน้าเว็บไซต์.
 * 
 */