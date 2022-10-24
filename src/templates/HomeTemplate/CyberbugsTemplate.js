import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import ContentMain from "../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../components/Cyberbugs/Main/InfoMain";
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberbugs from "../../components/Cyberbugs/ModalCyberbugs/ModalCyberbugs";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";
import "../../index.css";

export const CyberbugsTemplate = (props) => {
  const { Component, ...restParam } = props;
  console.log("props====", props);
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <SidebarCyberbugs />
              <MenuCyberbugs />
              <Component {...propsRoute} />
              <ModalCyberbugs />
            </div>
          </>
        );
      }}
    />
  );
};
