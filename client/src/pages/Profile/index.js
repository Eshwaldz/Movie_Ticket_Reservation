import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { GetCurrentUser } from "../../apicalls/users";

import { Tabs } from "antd";

import PageTitle from "../../components/PageTitle";

import Bookings from "./Bookings";

function Profile() {
  return (
    <div>
      <PageTitle title="Profile" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          <Bookings />
        </Tabs.TabPane>

      </Tabs>
    </div>
  );
}

export default Profile;
