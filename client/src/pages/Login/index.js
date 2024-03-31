import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Form, message } from "antd";

import Button from "../../components/Button";

import { LoginUser } from "../../apicalls/users";

import { HideLoading, ShowLoading} from '../../redux/loadersSlice';

/**
 * Component สำหรับหน้า Login ของเว็บไซต์
 * @returns {JSX.Element} - โค้ด JSX สำหรับหน้า Login
 */
function Login() {
  const navigate = useNavigate(); // Hook สำหรับการนำทาง
  const dispatch = useDispatch(); // Hook สำหรับการใช้งาน dispatch

  /**
   * ฟังก์ชันสำหรับการล็อกอิน
   * @param {Object} values - ค่าที่รับมาจากฟอร์มการล็อกอิน
   */
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await LoginUser(values); // เรียกใช้งาน API เพื่อล็อกอิน
      dispatch(HideLoading())
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data); // เก็บ Token ลงใน Local Storage
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); // นำทางไปยังหน้าหลัก หากมี Token อยู่ใน Local Storage
    }
  }, []);

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">Sign In - Login</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          {/* Input สำหรับอีเมล */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" />
          </Form.Item>

          {/* Input สำหรับรหัสผ่าน */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" />
          </Form.Item>
          <div className="flex flex-col mt-2 gap-1">
            {/* ปุ่มสำหรับล็อกอิน */}
            <Button fullWidth title="Login" type="submit" />
            {/* ลิงก์สำหรับสมัครสมาชิก */}
            <Link to="/register" className="text-primary">
              {" "}
              Don't have an account?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;

/**
 * Login Component:
 * 
 * หน้าที่/การใช้งาน: Login Component ใช้สำหรับแสดงหน้า Login ของเว็บไซต์เพื่อให้ผู้ใช้ทำการล็อกอินเข้าสู่ระบบ.
 * 
 */