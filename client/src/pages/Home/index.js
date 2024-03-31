import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Col, message, Row, Table } from "antd";

import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import { GetAllMovies } from "../../apicalls/movies";

import moment from "moment";

/**
 * Component สำหรับหน้า Home ของเว็บไซต์
 * @returns {JSX.Element} - โค้ด JSX สำหรับหน้า Home
 */
function Home() {
  const [searchText = "", setSearchText] = React.useState(""); // สถานะสำหรับค้นหาข้อความ
  const [movies, setMovies] = React.useState([]); // สถานะสำหรับเก็บข้อมูลหนัง
  const navigate = useNavigate(); // hook สำหรับการนำทาง
  const dispatch = useDispatch(); // hook สำหรับการใช้งาน dispatch

  /**
   * ฟังก์ชันสำหรับดึงข้อมูลหนังทั้งหมด
   */
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies(); // เรียกใช้งาน API เพื่อดึงข้อมูลหนังทั้งหมด
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {/* Input สำหรับค้นหา */}
      <input
        type="text"
        className="search-input"
        placeholder="Search for any movies"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* แสดงรายการหนัง */}
      <Row gutter={[20]} className="mt-2">
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((movie) => (
            <Col span={6}>
              {/* แสดงรายละเอียดของหนังแต่ละเรื่อง */}
              <div
                className="card flex flex-col gap-1 cursor-pointer mb-1"
                onClick={() =>
                  navigate(
                    `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                  )
                }
              >

                {/* แสดงรูปภาพโปสเตอร์ของหนัง */}
                <img src={movie.poster} alt="" height={200} />

                <div className="flex justify-center p-1">
                  <h1 className="text-md uppercase">{movie.title}</h1>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Home;

/**
 * Home Component:
 * 
 * หน้าที่/การใช้งาน: Home Component ใช้สำหรับแสดงหน้า Home ของเว็บไซต์ โดยมีการแสดงรายการหนังทั้งหมดที่มีในระบบและมีช่องค้นหาเพื่อค้นหาหนังตามชื่อ.
 */