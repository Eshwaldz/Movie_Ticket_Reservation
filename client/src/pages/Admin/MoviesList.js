import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Table, message } from "antd";

import Button from "../../components/Button";

import MovieForm from "./MovieForm";

import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import { DeleteMovie, GetAllMovies } from "../../apicalls/movies";

import moment from "moment";

/**
 * Component สำหรับแสดงรายการหนังและส่วนของการจัดการข้อมูลหนัง
 * @returns {JSX.Element} - Element ที่มีรายการหนังและส่วนการจัดการข้อมูลหนัง
 */
function MoviesList() {
  // สถานะของข้อมูลหนังและการแสดง Modal สำหรับฟอร์มหนัง
  const [movies, setMovies] = React.useState([]);
  const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [formType, setFormType] = React.useState("add");

  const dispatch = useDispatch();

  /**
   * ฟังก์ชันสำหรับดึงข้อมูลหนัง
   */
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // แสดง Loading
      const response = await GetAllMovies(); // ดึงข้อมูลหนังจาก API
      if (response.success) {
        setMovies(response.data); // กำหนดข้อมูลหนังให้กับ state
      } else {
        message.error(response.message); // แสดงข้อความ error หากการดึงข้อมูลล้มเหลว
      }
      dispatch(HideLoading()); // ซ่อน Loading
    } catch (error) {
      // แสดงข้อความ error หากการดึงข้อมูลล้มเหลว
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  /**
   * ฟังก์ชันสำหรับลบหนัง
   * @param {string} movieId - ไอดีของหนังที่จะลบ
   */
  const handleDelete = async (movieId) => {
    try {
      dispatch(ShowLoading()); // แสดง Loading
      // ลบหนังจาก API
      const response = await DeleteMovie({ 
        movieId,
      });
      if (response.success) {
        message.success(response.message); // แสดงข้อความ success หากลบข้อมูลสำเร็จ
        getData(); // ดึงข้อมูลหนังใหม่
      } else {
        message.error(response.message); // แสดงข้อความ error หากการลบข้อมูลล้มเหลว
      }
      dispatch(HideLoading()); // ซ่อน Loading
    } catch (error) {
      // แสดงข้อความ error หากการลบข้อมูลล้มเหลว
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // คอลัมน์ที่ใช้แสดงข้อมูลหนังในตาราง
  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return (
          <img
            src={record.poster}
            alt="poster"
            height="60"
            width="80"
            className="br-1"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {/* ปุ่มลบหนัง */}
            <i
              className="ri-delete-bin-line"
              style={{ color: "red" }}
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
            {/* ปุ่มแก้ไขข้อมูลหนัง */}
            <i
              className="ri-pencil-line"
              style={{ color: "blue" }}
              onClick={() => {
                setSelectedMovie(record);
                setFormType("edit");
                setShowMovieFormModal(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  // เมื่อ Component ถูกโหลดเสร็จแล้ว ให้ดึงข้อมูลหนัง
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-1">
        {/* ปุ่มเพิ่มหนัง */}
        <Button
          title="Add Movie"
          variant="outlined"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add");
          }}
        />
      </div>

      {/* ตารางแสดงรายการหนัง */}
      <Table columns={columns} dataSource={movies} />

      {/* Modal สำหรับเพิ่มหรือแก้ไขข้อมูลหนัง */}
      {showMovieFormModal && (
        <MovieForm
          showMovieFormModal={showMovieFormModal}
          setShowMovieFormModal={setShowMovieFormModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}
        />
      )}
    </div>
  );
}

export default MoviesList;

/**
 * MoviesList Component:
 * 
 * หน้าที่/การใช้งาน: MoviesList Component ใช้สำหรับแสดงรายการหนังและส่วนของการจัดการข้อมูลหนังในหน้า 
 * Admin Control Panel โดยแสดงตารางข้อมูลหนังและสามารถเพิ่ม แก้ไข หรือลบข้อมูลหนังได้ผ่านฟอร์มที่เกี่ยวข้อง.
 * 
 * การส่งคืนข้อมูล: Component นี้ไม่มีการส่งคืนข้อมูลเนื่องจากไม่มีการสร้าง Element ที่เป็นผลลัพธ์ที่ต้องส่งออกไปยัง Component อื่น.
 * 
 */