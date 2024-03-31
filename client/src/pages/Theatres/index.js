import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { GetCurrentUser } from "../../apicalls/users";

import { Tabs } from "antd";

import PageTitle from "../../components/PageTitle";

import TheatresList from "./TheatresList";
import Bookings from "../Profile/Bookings";

/**
 * Theatres component สำหรับแสดงหน้า Employee Control Panel ซึ่งประกอบด้วยเมนู Theatres
 * @returns {JSX.Element} - โค้ด JSX สำหรับแสดงหน้า Employee Control Panel พร้อมเมนู Theatres
 */
function Theatres() {
  return (
    <div>
      <PageTitle title="Employee Control Panel" />

      <Tabs defaultActiveKey="1">

        <Tabs.TabPane tab="Theatres" key="1">
          <TheatresList />
        </Tabs.TabPane>

      </Tabs>
    </div>
  );
}

export default Theatres;

/**
 * Theatres Component:
 * 
 * หน้าที่และการใช้งาน: Component นี้ใช้สำหรับแสดงหน้า Employee Control Panel ซึ่งประกอบด้วยเมนู Theatres
 */
