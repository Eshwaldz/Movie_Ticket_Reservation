import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TheatreForm from "./TheatreForm";
import Shows from "./Shows";

import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import {
  DeleteTheatre,
  GetAllTheatres,
  GetAllTheatresByOwner,
} from "../../apicalls/theatres";

import Button from "../../components/Button";

import { Table, message } from "antd";

/**
 * TheatresList component สำหรับแสดงรายการโรงหนังทั้งหมดและจัดการโรงหนัง
 * @returns {JSX.Element} - โค้ด JSX สำหรับแสดงและจัดการรายการโรงหนัง
 */
function TheatresList() {
  const { user } = useSelector((state) => state.users); // ดึงข้อมูลผู้ใช้ปัจจุบันจาก Redux store
  const [showTheatreFormModal = false, setShowTheatreFormModal] = // สถานะการแสดง Modal ของฟอร์มโรงหนัง
    useState(false);
  const [selectedTheatre = null, setSelectedTheatre] = useState(null); // ข้อมูลโรงหนังที่ถูกเลือกสำหรับแก้ไข
  const [formType = "add", setFormType] = useState("add"); // ประเภทของฟอร์ม (เพิ่มหรือแก้ไข)
  const [theatres = [], setTheatres] = useState([]); // ข้อมูลโรงหนังทั้งหมด

  const [openShowsModal = false, setOpenShowsModal] = useState(false); // สถานะการแสดง Modal ของรายการการแสดง
  const dispatch = useDispatch(); // เรียกใช้ dispatch เพื่อส่ง action ไปยัง Redux store
  const navigate = useNavigate(); // เรียกใช้ hook ในการเปลี่ยนเส้นทาง

  // ฟังก์ชันสำหรับดึงข้อมูลโรงหนัง
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresByOwner({
        owner: user._id, // เรียกใช้งาน API เพื่อดึงข้อมูลโรงหนังโดยใช้ ID ของผู้ใช้ปัจจุบัน
      });
      if (response.success) {
        setTheatres(response.data); // เซ็ตข้อมูลโรงหนังที่ได้รับจาก API ลงใน state
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // ฟังก์ชันสำหรับลบโรงหนัง
  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteTheatre({ theatreId: id }); // เรียกใช้งาน API เพื่อลบโรงหนังโดยใช้ ID ของโรงหนัง
      if (response.success) {
        message.success(response.message);
        getData(); // โหลดข้อมูลโรงหนังใหม่หลังจากลบโรงหนังเสร็จสมบูรณ์
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // คอลัมน์ของตารางรายการโรงหนัง
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return "Active";
        } else {
          return "Pending";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1 items-center">
            <i
              className="ri-delete-bin-line"
              style={{ color: "red" }}
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
            <i
              className="ri-pencil-line"
              style={{ color: "blue" }}
              onClick={() => {
                setFormType("edit");
                setSelectedTheatre(record);
                setShowTheatreFormModal(true);
              }}
            ></i>
            {record.isActive && (
              <span
                className="underline"
                onClick={() => {
                  setSelectedTheatre(record);
                  setOpenShowsModal(true);
                }}
              >
                Theatres Info
              </span>
            )}
          </div>
        );
      },
    },
  ];

  // ดึงข้อมูลโรงหนังเมื่อคอมโพเนนต์ถูกโหลดเข้ามา
  useEffect(() => {
    getData(); // เมื่อคอมโพเนนต์ถูกโหลด ให้ดึงข้อมูลโรงหนัง
  }, []);

  return (
    <div>
      {/* ปุ่มเพิ่มโรงหนัง */}
      <div className="flex justify-end mb-1">
        <Button
          variant="outlined"
          title="Add Theatre"
          onClick={() => {
            setFormType("add");
            setShowTheatreFormModal(true);
          }}
        />
      </div>

      {/* ตารางแสดงข้อมูลโรงหนัง */}
      <Table columns={columns} dataSource={theatres} />

      {/* ฟอร์มเพิ่มหรือแก้ไขข้อมูลโรงหนัง */}
      {showTheatreFormModal && (
        <TheatreForm
          showTheatreFormModal={showTheatreFormModal}
          setShowTheatreFormModal={setShowTheatreFormModal}
          formType={formType}
          setFormType={setFormType}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}

      {/* รายการการแสดงของโรงหนัง */}
      {openShowsModal && (
        <Shows
          openShowsModal={openShowsModal}
          setOpenShowsModal={setOpenShowsModal}
          theatre={selectedTheatre}
        />
      )}
    </div>
  );
}

export default TheatresList;

/**
 * TheatreForm Component:
 * 
 * หน้าที่: Component นี้เป็นส่วนหนึ่งของหน้าจอการจัดการโรงหนัง ซึ่งใช้สำหรับแสดงและจัดการฟอร์มเพิ่มหรือแก้ไขข้อมูลโรงหนัง
 * 
 * พารามิเตอร์:
 * showTheatreFormModal: สถานะการแสดง Modal ของฟอร์มโรงหนัง
 * setShowTheatreFormModal: ฟังก์ชันเพื่อตั้งค่าสถานะการแสดง Modal ของฟอร์มโรงหนัง
 * formType: ประเภทของฟอร์ม (เพิ่มหรือแก้ไข)
 * setFormType: ฟังก์ชันเพื่อตั้งค่าประเภทของฟอร์ม
 * selectedTheatre: ข้อมูลโรงหนังที่ถูกเลือกสำหรับแก้ไข
 * setSelectedTheatre: ฟังก์ชันเพื่อตั้งค่าข้อมูลโรงหนังที่ถูกเลือกสำหรับแก้ไข
 * getData: ฟังก์ชันสำหรับดึงข้อมูลโรงหนัง
 */
