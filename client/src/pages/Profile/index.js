import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { GetCurrentUser } from "../../apicalls/users";

import { Tabs } from "antd";

import PageTitle from "../../components/PageTitle";

import Bookings from "./Bookings";

/**
 * Component สำหรับหน้าโปรไฟล์ของผู้ใช้
 * @returns {JSX.Element} - โค้ด JSX สำหรับหน้าโปรไฟล์
 */
function Profile() {
  return (
    <div>
      <PageTitle title="Profile" /> {/* แสดงชื่อหน้าโปรไฟล์ */}

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          <Bookings />
        </Tabs.TabPane>

      </Tabs>
    </div>
  );
}

export default Profile;

/**
 * Profile Component:
 * 
 * หน้าที่/การใช้งาน: Component นี้ใช้สำหรับแสดงหน้าโปรไฟล์ของผู้ใช้.
 * 
 */