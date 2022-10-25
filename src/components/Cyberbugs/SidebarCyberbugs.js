import React, { useState } from "react";
import { Breadcrumb, Layout, MenuProps } from "antd";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarsOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";

export default function SidebarCyberbugs() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "100%" }}
      >
        <div className="text-right pr-2 mt-3" onClick={toggle}>
          <BarsOutlined
            style={{ cursor: "pointer", color: "#fff", fontSize: 25 }}
          />
        </div>

        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<PlusOutlined style={{ fontSize: 20 }} />}>
            <span className="mb-2">Create task</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
