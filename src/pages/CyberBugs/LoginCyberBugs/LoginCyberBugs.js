import React from "react";
import {
  UserOutlined,
  UnlockOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Input, Button } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, dispatch } from "react-redux";
// import {  } from "antd/lib/radio";
import { USER_SIGNIN_API } from "../../../redux/constants/Cyberbugs/Cyberbugs";
import { singinCyberbugAction } from "../../../redux/actions/CyberBugsActions";

function LoginCyberBug(props) {
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
        <h3>Login CyberBugs</h3>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            name="email"
            size="large"
            placeholder="email"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            type="password"
            name="password"
            size="large"
            placeholder="password"
            prefix={<UnlockOutlined />}
          />
        </div>
        <div className="text-danger">{errors.password}</div>
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
          Login
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

const LoginCyberBugWithFormik = withFormik({
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
  }),

  handleSubmit: ({ email, password }, { props }) => {
    // let action = {
    //   type: USER_SIGNIN_API,
    //   userLogin: {
    //     email: values.email,
    //     password: values.password,
    //   },
    // };

    props.dispatch(singinCyberbugAction(email, password));
    console.log("props redux", props);
  },

  displayName: "BasicForm",
})(LoginCyberBug);

export default connect()(LoginCyberBugWithFormik);
