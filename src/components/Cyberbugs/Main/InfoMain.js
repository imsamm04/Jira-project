import React from "react";

export default function InfoMain() {
  return (
    <>
      <h3>Cyber Board</h3>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (1).jfif")}
              alt="true"
            />
          </div>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (2).jfif")}
              alt="true"
            />
          </div>
          <div className="avatar">
            <img
              src={require("../../../assets/img/download (3).jfif")}
              alt="true"
            />
          </div>
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
