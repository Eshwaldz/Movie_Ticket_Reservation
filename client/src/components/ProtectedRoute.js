import { message } from "antd";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GetCurrentUser } from "../apicalls/users";

import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

/**
 * Component สำหรับการจัดการเส้นทางที่มีการควบคุมการเข้าถึงหน้าจอในสถานะที่ต้องมีการเข้าสู่ระบบ
 * @param {object} props - คุณสมบัติของ Component
 * @param {JSX.Element} props.children - Element ภายในของ Component
 * @returns {JSX.Element} - Element ที่มีการควบคุมการเข้าถึงหน้าจอในสถานะที่ต้องมีการเข้าสู่ระบบ
 */
function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * ฟังก์ชันสำหรับการเรียกข้อมูลผู้ใช้ปัจจุบันจากเซิร์ฟเวอร์
   */
  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(SetUser(null));
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // ทำการตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือยัง โดยใช้ localStorage.getItem("token")
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div className="layout p-1">
        <div className="header bg-primary flex justify-between p-2">
          <div>
            <h1
              className="text-2xl text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              {" "}
              HOMEPAGE{" "}
            </h1>
          </div>

          <div className="bg-white p-1 flex gap-1">
            <i className="ri-shield-user-line text-primary"></i>
            <h1
              className="text-sm underline"
              onClick={() => {
                if (user.isAdmin) {
                  // หากผู้ใช้มีสิทธิ์เป็นแอดมิน จะเปลี่ยนเส้นทางไปยังหน้า admin
                  navigate("/admin");
                } else if (user.isEmployee){
                  // หากผู้ใช้เป็นพนักงาน จะเปลี่ยนเส้นทางไปยังหน้า theatres
                  navigate("/theatres");
                }
                else {
                  // หากผู้ใช้เป็นผู้ใช้ทั่วไป จะเปลี่ยนเส้นทางไปยังหน้า profile
                  navigate("/profile");
                }
              }}
            >
              {user.name}
            </h1>

            <i
              className="ri-logout-box-r-line ml-2"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="content mt-1 p-1">{children}</div>
      </div>
    )
  );
}

export default ProtectedRoute;

/** 
 * ProtectedRoute Component:
 * 
 * หน้าที่: ใช้สำหรับควบคุมการเข้าถึงหน้าจอในสถานะที่ต้องมีการเข้าสู่ระบบ โดยมีลักษณะการทำงานดังนี้
 * ตรวจสอบว่ามี token ที่เก็บอยู่ใน localStorage หรือไม่ ถ้ามีก็จะดึงข้อมูลผู้ใช้ปัจจุบันจากเซิร์ฟเวอร์
 * ถ้ามีการเข้าสู่ระบบอยู่ จะแสดงหน้าเว็บตามสิทธิ์ของผู้ใช้ เช่น หน้า Homepage สำหรับผู้ใช้ทั่วไป, หน้า admin สำหรับผู้ดูแลระบบ, หรือหน้า theatres สำหรับพนักงานขายตั๋วหนัง
 * ถ้าไม่มีการเข้าสู่ระบบ จะทำการเปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
 * 
 * การส่งคืนข้อมูล: แสดง Element ของหน้าเว็บตามสิทธิ์ของผู้ใช้ที่เข้าสู่ระบบ
 * 
*/