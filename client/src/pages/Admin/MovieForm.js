import React from "react";
import { useDispatch } from "react-redux";

import { Col, Form, Modal, Row, message } from "antd";

import Button from "../../components/Button";

import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import { AddMovie, UpdateMovie } from "../../apicalls/movies";

import moment from "moment";

/**
 * Component สำหรับแสดงฟอร์มการเพิ่มหรือแก้ไขข้อมูลหนัง
 * @param {object} props - คุณสมบัติของ Component
 * @param {boolean} props.showMovieFormModal - สถานะการแสดงฟอร์มของหนัง
 * @param {function} props.setShowMovieFormModal - ฟังก์ชันเพื่อเปลี่ยนสถานะการแสดงฟอร์มของหนัง
 * @param {object} props.selectedMovie - ข้อมูลของหนังที่ถูกเลือก
 * @param {function} props.setSelectedMovie - ฟังก์ชันเพื่อกำหนดข้อมูลหนังที่ถูกเลือก
 * @param {function} props.getData - ฟังก์ชันเพื่อดึงข้อมูลหนัง
 * @param {string} props.formType - ประเภทของฟอร์ม (add หรือ edit)
 * @returns {JSX.Element} - Element ที่มีฟอร์มการเพิ่มหรือแก้ไขข้อมูลหนัง
 */
function MovieForm({
  showMovieFormModal,
  setShowMovieFormModal,
  selectedMovie,
  setSelectedMovie,
  getData,
  formType,
}) {
  // ตรวจสอบและจัดรูปแบบวันที่ releaseDate หากมี selectedMovie
  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }

  const dispatch = useDispatch();

  /**
   * ฟังก์ชันสำหรับการส่งข้อมูลฟอร์มการเพิ่มหรือแก้ไขข้อมูลหนัง
   * @param {object} values - ข้อมูลที่ถูกส่งมาจากฟอร์ม
   */
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading()); // แสดง Loading
      let response = null;

       // ตรวจสอบ formType เพื่อดำเนินการเพิ่มหรือแก้ไขข้อมูล
      if (formType === "add") {
        response = await AddMovie(values);
      } else {
        response = await UpdateMovie({
          ...values,
          movieId: selectedMovie._id,
        });
      }

      // ตรวจสอบคำตอบจาก API และดำเนินการต่อ
      if (response.success) {
        getData();
        message.success(response.message);
        setShowMovieFormModal(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading()); // ซ่อน Loading
    } catch (error) {
      // ซ่อน Loading และแสดงข้อความ error
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
      open={showMovieFormModal}
      onCancel={() => {
        // ปิด Modal และเซ็ต selectedMovie เป็น null
        setShowMovieFormModal(false);
        setSelectedMovie(null);
      }}
      footer={null}
      width={800}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedMovie}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Movie Name" name="title">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Movie Description" name="description">
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Movie Duration (mins)" name="duration">
              <input type="number" />
            </Form.Item>
          </Col>

          {/* แสดงตัวเลือกของแต่ละ Genre */}
          <Col span={8}>
            <Form.Item label="Genre" name="genre">
              <select name="" id="">
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Comedy">Comedy</option>
                <option value="Documentary">Documentary</option>
                <option value="Drama">Drama</option>
                <option value="Experimental">Experimental</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Historical">Historical</option>
                <option value="Horror">Horror</option>
                <option value="Musical">Musical</option>
                <option value="Mystery">Mystery</option>
                <option value="Parody">Parody</option>
                <option value="Romance">Romance</option>
                <option value="Sports">Sports</option>
                <option value="Thriller">Thriller</option>
                <option value="Western">Western</option>
              </select>
            </Form.Item>
          </Col>

          {/* แสดงตัวเลือกของแต่ละ Language */}
          <Col span={8}>
            <Form.Item label="Language" name="language">
              <select name="" id="">
                <option value="">Select Language</option>
                <option value="Thai">Thai</option>
                <option value="English">English</option>
                <option value="Japan">Japan</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Movie Release Date" name="releaseDate">
              <input type="date" />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item label="Poster URL" name="poster">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-1">
          {/* ปุ่ม Cancel เพื่อยกเลิกการกรอกข้อมูล */}
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowMovieFormModal(false);
              setSelectedMovie(null);
            }}
          />
          {/* ปุ่ม Save เพื่อยืนยันการกรอกข้อมูล */}
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default MovieForm;

/**
 * MovieForm Component:
 * 
 * หน้าที่/การใช้งาน: MovieForm Component ใช้สำหรับแสดงฟอร์มการเพิ่มหรือแก้ไขข้อมูลหนัง 
 * โดยมีการแสดงหัวข้อฟอร์มเป็น "ADD MOVIE" หรือ "EDIT MOVIE" ตามประเภทของฟอร์ม
 * 
 * การรับพารามิเตอร์:
 * showMovieFormModal: สถานะการแสดงฟอร์มของหนัง
 * setShowMovieFormModal: ฟังก์ชันเพื่อเปลี่ยนสถานะการแสดงฟอร์มของหนัง
 * selectedMovie: ข้อมูลของหนังที่ถูกเลือกสำหรับแก้ไข (ถ้ามี)
 * setSelectedMovie: ฟังก์ชันเพื่อกำหนดข้อมูลหนังที่ถูกเลือก
 * getData: ฟังก์ชันเพื่อดึงข้อมูลหนังหลังจากการเพิ่มหรือแก้ไข
 * formType: ประเภทของฟอร์ม (add หรือ edit)
 * 
 */