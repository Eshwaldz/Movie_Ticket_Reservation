import React from "react";

import { Tabs } from "antd";

import PageTitle from "../../components/PageTitle";
import MoviesList from "./MoviesList";
import TheatresList from "./TheatresList";

/**
 * Component สำหรับหน้า Admin Control Panel ที่มีการแสดงรายการหนังและโรงหนัง
 * @returns {JSX.Element} - Element ที่มีหน้า Admin Control Panel 
 * ที่ประกอบด้วยหัวเรื่องหน้า และแท็บสำหรับแสดงรายการหนังและโรงหนัง
 */
function Admin() {
  return (
    <div>
      {/* แสดงหัวเรื่องหน้า Admin Control Panel */}
      <PageTitle title="Admin Control Panel" />

      {/* แสดงแท็บสำหรับเลือกแสดงรายการหนังหรือโรงหนัง */}
      <Tabs defaultActiveKey="1">

        {/* แสดงแท็บสำหรับรายการหนัง */}
        <Tabs.TabPane tab="Movies" key="1">
          <MoviesList />
        </Tabs.TabPane>

        {/* แสดงแท็บสำหรับรายการโรงหนัง */}
        <Tabs.TabPane tab="Theatres" key="2">
          <TheatresList />
        </Tabs.TabPane>
        
      </Tabs>
    </div>
  );
}

export default Admin;

/**
 * Admin Component:
 * 
 * หน้าที่/การใช้งาน: Admin Component ใช้สำหรับแสดงหน้า Admin Control Panel ซึ่งประกอบด้วยหัวเรื่องหน้า 
 * "Admin Control Panel" และแท็บสำหรับเลือกแสดงรายการหนังหรือโรงหนัง
 * 
 * การส่งคืนข้อมูล: Component จะแสดง Element ที่ประกอบด้วยหัวเรื่องหน้า แท็บสำหรับเลือกแสดงรายการหนังหรือโรงหนัง และรายการหนังหรือโรงหนังตามที่ผู้ใช้เลือก
 * 
 */
