import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Tabs } from "antd";

import PageTitle from "../../components/PageTitle";

import TheatresList from "./TheatresList";
import Bookings from "./Bookings";

function Profile() {
  return (
    <div>
      <PageTitle title="Profile" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          <Bookings />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theatres" key="2">
          <TheatresList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
