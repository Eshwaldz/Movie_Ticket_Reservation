import React from 'react'

/**
 * Component สำหรับแสดงหัวเรื่องหน้า (Page Title)
 * @param {object} props - คุณสมบัติของ Component
 * @param {string} props.title - ข้อความที่ต้องการแสดงเป็นหัวเรื่องหน้า
 * @returns {JSX.Element} - Element ของหัวเรื่องหน้า
 */
function PageTitle({title}) {
  return (
    <h1 className='text-xl uppercase'>
        {title}
    </h1>
  )
}

export default PageTitle

/**
 * PageTitle Component:
 * 
 * หน้าที่: แสดงหัวเรื่องหน้าในแอปพลิเคชัน React
 * 
 * พารามิเตอร์:
 * title: ข้อความที่ต้องการแสดงเป็นหัวเรื่องหน้า
 * 
 * การส่งคืนข้อมูล: Element ของหัวเรื่องหน้าเป็น JSX.Element ที่ประกอบด้วยข้อความที่ระบุในพารามิเตอร์ title.
 * 
 */