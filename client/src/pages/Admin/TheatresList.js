import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetAllTheatres, UpdateTheatre } from "../../apicalls/theatres";

import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import { message, Table } from "antd";

/**
 * Component สำหรับแสดงรายการโรงหนังและการจัดการสถานะของโรงหนัง
 * @returns {JSX.Element} - Element ที่มีรายการโรงหนังและส่วนการจัดการสถานะของโรงหนัง
 */
function TheatresList() {
  // สถานะของข้อมูลโรงหนังและฟังก์ชัน dispatch
  const [theatres = [], setTheatres] = useState([]);
  const dispatch = useDispatch();

  /**
   * ฟังก์ชันสำหรับดึงข้อมูลโรงหนัง
   */
  const getData = async () => {
    try {
      dispatch(ShowLoading()); // แสดง Loading
      const response = await GetAllTheatres(); // ดึงข้อมูลโรงหนังจาก API
      if (response.success) {
        setTheatres(response.data); // กำหนดข้อมูลโรงหนังให้กับ state
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
   * ฟังก์ชันสำหรับเปลี่ยนสถานะของโรงหนัง (อนุมัติหรือปฏิเสธ)
   * @param {object} theatre - ข้อมูลของโรงหนัง
   */
  const handleStatusChange = async (theatre) => {
    try {
      dispatch(ShowLoading()); // แสดง Loading
      // เปลี่ยนสถานะของโรงหนัง
      const response = await UpdateTheatre({
        theatreId: theatre._id,
        ...theatre,
        isActive: !theatre.isActive,
      });
      if (response.success) {
        // แสดงข้อความ success หากการเปลี่ยนสถานะสำเร็จ
        message.success(response.message);
        getData(); // ดึงข้อมูลโรงหนังใหม่
      } else {
        // แสดงข้อความ error หากการเปลี่ยนสถานะล้มเหลว
        message.error(response.message);
      }
      dispatch(HideLoading()); // ซ่อน Loading
    } catch (error) {
      // แสดงข้อความ error หากการเปลี่ยนสถานะล้มเหลว
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // คอลัมน์ที่ใช้แสดงข้อมูลโรงหนังในตาราง
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
      title: "Owner",
      dataIndex: "owner",
      render: (text, record) => {
        return record.owner.name;
      },
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
          <div className="flex gap-1">
            {/* ปุ่มเปลี่ยนสถานะของโรงหนัง */}
            {record.isActive && (
              <span
                className="underline"
                onClick={() => handleStatusChange(record)}
              >
                Reject
              </span>
            )}
            {!record.isActive && (
              <span
                className="underline"
                onClick={() => handleStatusChange(record)}
              >
                Approve
              </span>
            )}
          </div>
        );
      },
    },
  ];

  // เมื่อ Component ถูกโหลดเสร็จแล้ว ให้ดึงข้อมูลโรงหนัง
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* ตารางแสดงรายการโรงหนัง */}
      <Table columns={columns} dataSource={theatres} />
    </div>
  );
}

export default TheatresList;

/**
 * TheatresList Component:
 * 
 * หน้าที่/การใช้งาน: ใช้สำหรับแสดงรายการโรงหนังและการจัดการสถานะของโรงหนัง 
 * โดยแสดงข้อมูลโรงหนังในรูปแบบตารางและสามารถเปลี่ยนสถานะของโรงหนัง (อนุมัติหรือปฏิเสธ) ได้.
 */