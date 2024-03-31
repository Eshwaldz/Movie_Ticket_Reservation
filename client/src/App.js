import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import TheatresForMovie from "./pages/TheatresForMovie";
import BookShow from "./pages/BookShow";
import Theatres from "./pages/Theatres";

import "./styles/alignments.css";
import "./styles/sizes.css";
import "./styles/form-elements.css";
import "./styles/custom.css";
import "./styles/theme.css";

import ProtectedRoute from "./components/ProtectedRoute";

/**
 * คอมโพเนนต์หลักที่แทนทั้งแอปพลิเคชัน
 * @returns {JSX.Element} ออบเจกต์ JSX.Element ที่แทนทั้งแอปพลิเคชัน
 */
function App() {
  // ดึงสถานะการโหลดจาก Redux store
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {/* แสดงโหลดเมื่อสถานะการโหลดเป็นจริง */}
      {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}

      <BrowserRouter> {/* BrowserRouter เพื่อจัดการเส้นทาง */}
        <Routes> {/* กำหนดเส้นทาง */}
          
          {/* เส้นทางสำหรับหน้าหลัก */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* เส้นทางสำหรับรายละเอียดภาพยนตร์ */}
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <TheatresForMovie />
              </ProtectedRoute>
            }
          />

          {/* เส้นทางสำหรับจองตารางการแสดง */}
          <Route
            path="/book-show/:id"
            element={
              <ProtectedRoute>
                <BookShow />
              </ProtectedRoute>
            }
          />

          {/* เส้นทางสำหรับโปรไฟล์ผู้ใช้ */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* เส้นทางสำหรับโรงภาพยนตร์ */}
          <Route
            path="/theatres"
            element={
              <ProtectedRoute>
                <Theatres />
              </ProtectedRoute>
            }
          />

          {/* เส้นทางสำหรับแดชบอร์ดผู้ดูแลระบบ */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} /> {/* เส้นทางสำหรับหน้าเข้าสู่ระบบ */}
          <Route path="/register" element={<Register />} /> {/* เส้นทางสำหรับหน้าลงทะเบียน */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// ส่งออกคอมโพเนนต์ App เป็นค่าเริ่มต้น
export default App;
