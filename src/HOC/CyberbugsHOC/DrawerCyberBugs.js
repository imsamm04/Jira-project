import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export default function DrawerCyberBugs(props) {
  const dispatch = useDispatch();
  //cach 1
  // const visible = useSelector((state) => state.drawerReducer.visible);
  //cach 2
  const { visible, ComponentContentDrawer } = useSelector(
    (state) => state.drawerReducer
  );

  // const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    dispatch({
      type: "OPEN_DRAWER",
    });
    // setVisible(true);
  };
  const onClose = () => {
    dispatch({
      type: "CLOSE_DRAWER",
    });
    // setVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
