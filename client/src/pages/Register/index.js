import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Form, message } from "antd";

import Button from "../../components/Button";

import { RegisterUser } from "../../apicalls/users";

import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

/**
 * Register component สำหรับหน้าที่ใช้ในการลงทะเบียนผู้ใช้ใหม่
 * @returns {JSX.Element} - โค้ด JSX สำหรับหน้าลงทะเบียน
 */
function Register() {
  // เรียกใช้ dispatch จาก Redux เพื่อใช้ในการส่ง action
  const dispatch = useDispatch();

  // เรียกใช้ hook useNavigate จาก React Router เพื่อใช้ในการเปลี่ยนเส้นทาง
  const navigate = useNavigate();

  /**
   * เมื่อลงทะเบียนสำเร็จ ให้ส่งข้อมูลไปยัง API เพื่อลงทะเบียนผู้ใช้
   * @param {Object} values - ข้อมูลที่ได้จากฟอร์มการลงทะเบียน
   */
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading()); // แสดง Loader
      const response = await RegisterUser(values); // ส่งข้อมูลไปยัง API เพื่อลงทะเบียนผู้ใช้
      dispatch(HideLoading()); // ซ่อน Loader เมื่อกระบวนการสำเร็จหรือเกิดข้อผิดพลาด
      if (response.success) { // ตรวจสอบว่าการลงทะเบียนสำเร็จหรือไม่
        message.success(response.message); // แสดงข้อความสำเร็จ
        navigate("/login"); // เปลี่ยนเส้นทางไปยังหน้าล็อกอิน
      } else {
        message.error(response.message);  // แสดงข้อความผิดพลาด
      }
    } catch (error) {
      dispatch(HideLoading());  // ซ่อน Loader เมื่อเกิดข้อผิดพลาด
      message.error(error.message); // แสดงข้อความผิดพลาด
    }
  };

  // เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    if (localStorage.getItem("token")) { // ถ้ามี token ใน localStorage ให้เปลี่ยนเส้นทางไปยังหน้าหลัก
      navigate("/");
    }
  }, []);

  // ส่ง Element ของหน้าลงทะเบียนกลับออก
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">Sign Up - Register</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" />
          </Form.Item>
          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="REGISTER" type="submit" />
            <Link to="/login" className="text-primary">
              {" "}
              Already have an account?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;

/**
 * Register Component:
 * 
 * หน้าที่/การใช้งาน: Component นี้ใช้สำหรับการลงทะเบียนผู้ใช้ใหม่.
 * 
 */