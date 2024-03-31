import { Form, message, Modal } from "antd";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button";

import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import { AddTheatre, UpdateTheatre } from "../../apicalls/theatres";

/**
 * TheatreForm component สำหรับแสดงและจัดการฟอร์มเพิ่มหรือแก้ไขข้อมูลโรงหนัง
 * @param {Object} props - ข้อมูลและฟังก์ชันที่ใช้ในการจัดการฟอร์มโรงหนัง
 * @param {boolean} props.showTheatreFormModal - สถานะการแสดง Modal ของฟอร์มโรงหนัง
 * @param {function} props.setShowTheatreFormModal - ฟังก์ชันสำหรับการตั้งค่าสถานะการแสดง Modal ของฟอร์มโรงหนัง
 * @param {string} props.formType - ประเภทของฟอร์ม (add หรือ edit)
 * @param {function} props.setFormType - ฟังก์ชันสำหรับการตั้งค่าประเภทของฟอร์ม
 * @param {Object} props.selectedTheatre - ข้อมูลของโรงหนังที่ถูกเลือก
 * @param {function} props.setSelectedTheatre - ฟังก์ชันสำหรับการตั้งค่าข้อมูลของโรงหนังที่ถูกเลือก
 * @param {function} props.getData - ฟังก์ชันสำหรับการโหลดข้อมูลโรงหนังใหม่หลังจากเพิ่มหรือแก้ไขข้อมูล
 * @returns {JSX.Element} - โค้ด JSX สำหรับแสดงและจัดการฟอร์มเพิ่มหรือแก้ไขข้อมูลโรงหนัง
 */
function TheatreForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,
  setFormType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  /**
   * ฟังก์ชันสำหรับการส่งข้อมูลฟอร์มและบันทึกหรือแก้ไขข้อมูลโรงหนัง
   * @param {Object} values - ข้อมูลที่ได้จากฟอร์ม
   */
  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheatre(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheatre(values);
      }

      if (response.success) {
        message.success(response.message);
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
        getData();
      } else {
        message.error(response.message);
      }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={showTheatreFormModal}
      onCancel={() => {
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input theatre name!" }]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input theatre address!" }]}
        >
          <textarea type="text" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input theatre phone number!" },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input owner theatre email!" }]}
        >
          <input type="email" />
        </Form.Item>
        <div className="flex justify-end gap-1">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
            }}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default TheatreForm;

/**
 * TheatreForm Component:
 * 
 * หน้าที่และการใช้งาน: Component นี้ใช้สำหรับแสดงฟอร์มเพื่อเพิ่มหรือแก้ไขข้อมูลของโรงหนัง 
 * โดยมีการรับข้อมูลเข้ามาเพื่อกำหนดการแสดง Modal และประเภทของฟอร์ม 
 * และมีการส่งข้อมูลของโรงหนังที่ถูกเลือกไปยังฟอร์ม เพื่อแสดงข้อมูลเริ่มต้นในฟอร์ม
 * 
 * พารามิเตอร์:
 * showTheatreFormModal: สถานะการแสดง Modal ของฟอร์มโรงหนัง
 * setShowTheatreFormModal: ฟังก์ชันสำหรับการตั้งค่าสถานะการแสดง Modal ของฟอร์มโรงหนัง
 * formType: ประเภทของฟอร์ม (add หรือ edit)
 * setFormType: ฟังก์ชันสำหรับการตั้งค่าประเภทของฟอร์ม
 * selectedTheatre: ข้อมูลของโรงหนังที่ถูกเลือก
 * setSelectedTheatre: ฟังก์ชันสำหรับการตั้งค่าข้อมูลของโรงหนังที่ถูกเลือก
 * getData: ฟังก์ชันสำหรับการโหลดข้อมูลโรงหนังใหม่หลังจากเพิ่มหรือแก้ไขข้อมูล
 * 
 */