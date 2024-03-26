import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { GetCurrentUser } from "../../apicalls/users";

import { Tabs } from "antd";

import PageTitle from "../../components/PageTitle";

import TheatresList from "./TheatresList";
import Bookings from "../Profile/Bookings";

function Theatres() {
  return (
    <div>
      <PageTitle title="Employee Control Panel" />

      <Tabs defaultActiveKey="1">

        <Tabs.TabPane tab="Theatres" key="1">
          <TheatresList />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Bookings" key="2">
          <Bookings />
        </Tabs.TabPane>

      </Tabs>
    </div>
  );
}

export default Theatres;
