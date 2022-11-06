import { Avatar, Image } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Icon, { LogoutOutlined } from "@ant-design/icons";
import { history } from "../../util/history";

const { TOKEN } = require("../../util/constants/settingSystem");
// src\util\constants\settingSystem.js

export default function MenuCyberbugs() {
  let user = localStorage.getItem(TOKEN);
  // const history = useHistory;
  const userLogin = useSelector(
    (state) => state.UserLoginCyberBugsReducer.userLogin
  );

  const userLogOut = () => {
    localStorage.clear();

    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };

  return (
    <div className="menu">
      <div className="account">
        <div className="account-avatar">
          <img src={require("../../assets/img/jira_logo.png")} alt="true" />
        </div>
        <div className="account-info">
          <h3>Jira Clone</h3>
          <span>Report bugs</span>
          <div className="account-info">
            Wellcome back :{userLogin?.name}
            <div className="mt-2">
              <Avatar
                src={userLogin?.avatar}
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  width: "50px",
                  height: "50px",
                }}
              ></Avatar>
              <div className="signout mt-1">
                <LogoutOutlined className="mr-2" />{" "}
                <NavLink to="/login" onClick={userLogOut}>
                  Sign out
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="control">
        <div>
          <i className="fa fa-paste mr-2" />
          <NavLink
            to="/cyberbugs"
            className="text-dark"
            activeClassName="active font-weight-bold"
          >
            Cyber Board
          </NavLink>
        </div>

        <div>
          <i className="fa fa-credit-card mr-2" />
          <NavLink
            to="/projectmanagement"
            className="text-dark"
            activeClassName="active font-weight-bold"
          >
            Project Cms
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-2" />
          <NavLink
            className="text-dark"
            to="/createproject"
            activeClassName="active font-weight-bold"
          >
            Create Project
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck mr-2" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals mr-2" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste mr-2" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow mr-2" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box mr-2" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
