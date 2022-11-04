import React from "react";
import {
  UserOutlined,
  UnlockOutlined,
  TwitterOutlined,
  AliwangwangOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Input, Button, InputNumber } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, dispatch } from "react-redux";
// import {  } from "antd/lib/radio";
import { registerCyberbugAction } from "../../../redux/actions/CyberBugsActions";

function RegisterCyberbug(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  console.log("props--- co ca redux dispatch", props);
  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3>Register Jira Clone</h3>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            name="email"
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger">{errors.email}</div>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            type="password"
            name="password"
            size="large"
            placeholder="Password"
            prefix={<UnlockOutlined />}
          />
        </div>
        <div className="text-danger">{errors.password}</div>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            name="name"
            size="large"
            placeholder="Name"
            prefix={<AliwangwangOutlined />}
          />
        </div>
        <div className="text-danger">{errors.name}</div>
        <div className="d-flex mt-3">
          <Input
            type="number"
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            name="phoneNumber"
            size="large"
            placeholder="Phone Number"
            prefix={<PhoneOutlined />}
          />
        </div>
        <div className="text-danger">{errors.phoneNumber}</div>
        <Button
          htmlType="submit"
          size="large"
          style={{
            minWidth: 300,
            backgroundColor: "rgb(102,117,223)",
            color: "#fff",
          }}
          className="mt-5"
        >
          Sign Up
        </Button>

        <div className="social mt-3 d-flex">
          <Button
            style={{ backgroundColor: "rgb(59,89,152)" }}
            shape="circle"
            size={"large"}
          >
            <span className="font-weight-bold" style={{ color: "#fff" }}>
              F
            </span>
          </Button>
          <Button
            type="primary ml-3"
            shape="circle"
            icon={<TwitterOutlined />}
            size={"large"}
          ></Button>
        </div>
      </div>
    </form>
  );
}

const RegisterCyberBugWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),

  // Custom sync validation
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid!"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have in 6 characters")
      .max(32, "Password must have max 32 characters"),

    name: Yup.string()
      .required("Name is required")
      .min(6, "Name must have in 4 characters")
      .max(32, "Name must have max 32 characters"),

    phoneNumber: Yup.string()
      .required("Phone number is required (number only)")
      .min(6, "Phone number must have in 4 characters")
      .max(32, "Phone number must have max 32 characters"),
  }),

  handleSubmit: ({ email, password, name, phoneNumber }, { props }) => {
    props.dispatch(registerCyberbugAction(email, password, name, phoneNumber));
    console.log("props redux", props);
  },

  displayName: "BasicForm",
})(RegisterCyberbug);

export default connect()(RegisterCyberBugWithFormik);
