import React from "react";
import { useSelector } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";


const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
export default function Home(props) {
  const userLogin = useSelector(
    (state) => state.UserLoginCyberBugsReducer.userLogin
  );
  return (
    <div>
      <CSVLink data={csvData}>Download me</CSVLink>;

      {userLogin?.name}
      <img src={userLogin?.avatar} alt="true" />
    </div>
  );
}
